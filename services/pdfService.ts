
import { jsPDF } from "jspdf";
import { Booking, Salon, Service } from "../types";

export const generateReceiptPDF = (booking: Booking, salon: Salon, service: Service) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Styles
  const primaryColor = "#ea580c"; // Orange-600
  const secondaryColor = "#0f172a"; // Slate-900

  // Header - Glameo Brand
  doc.setFillColor(secondaryColor);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("GLAMEO", 20, 25);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("VOTRE ÉCLAT AU QUOTIDIEN", 20, 32);

  // Salon Details
  doc.setTextColor(secondaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(salon.name, 20, 55);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(salon.address, 20, 62);

  // Invoice Meta
  doc.setFont("helvetica", "bold");
  doc.text(`REÇU # : ${booking.id.toUpperCase()}`, pageWidth - 20, 55, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`Date : ${new Date(booking.dateTime).toLocaleDateString('fr-CA')}`, pageWidth - 20, 62, { align: "right" });

  // Divider
  doc.setDrawColor(241, 245, 249);
  doc.line(20, 75, pageWidth - 20, 75);

  // Client Details
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT :", 20, 85);
  doc.setFont("helvetica", "normal");
  doc.text(booking.clientName, 40, 85);

  // Table Header
  doc.setFillColor(248, 250, 252);
  doc.rect(20, 95, pageWidth - 40, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.text("DÉSIGNATION DU SOIN", 25, 101.5);
  doc.text("PRIX", pageWidth - 25, 101.5, { align: "right" });

  // Table Row
  doc.setFont("helvetica", "normal");
  doc.text(service.name, 25, 115);
  doc.text(`${service.price.toFixed(2)} $`, pageWidth - 25, 115, { align: "right" });

  // Summary
  const startX = pageWidth - 90;
  const startY = 135;
  const tps = booking.totalPrice * 0.05;
  const tvq = booking.totalPrice * 0.09975;
  const total = booking.totalPrice + tps + tvq;

  doc.text("Sous-total :", startX, startY);
  doc.text(`${booking.totalPrice.toFixed(2)} $`, pageWidth - 25, startY, { align: "right" });

  doc.text("TPS (5%) :", startX, startY + 7);
  doc.text(`${tps.toFixed(2)} $`, pageWidth - 25, startY + 7, { align: "right" });

  doc.text("TVQ (9.975%) :", startX, startY + 14);
  doc.text(`${tvq.toFixed(2)} $`, pageWidth - 25, startY + 14, { align: "right" });

  // Total
  doc.setFillColor(primaryColor);
  doc.rect(startX - 5, startY + 20, 75, 12, "F");
  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TOTAL :", startX, startY + 28);
  doc.text(`${total.toFixed(2)} $`, pageWidth - 25, startY + 28, { align: "right" });

  // Footer
  doc.setTextColor("#94a3b8");
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("Merci de faire confiance aux artisans de la beauté Glameo.", pageWidth / 2, 280, { align: "center" });
  doc.text("Ce document est un reçu officiel généré numériquement.", pageWidth / 2, 285, { align: "center" });

  doc.save(`Glameo_Recu_${booking.id}.pdf`);
};
