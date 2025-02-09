/* eslint-disable react/prop-types */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { IoMdDownload } from "react-icons/io";
import { useState } from "react";
const TicketPdf = ({ ticket }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const generatePdf = () => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("id-ID", options);
    };

    const doc = new jsPDF();

    // Lebar kolom DETAIL dan ADULT
    const detailColumnWidth = 120; // Lebar untuk kolom DETAIL
    const adultColumnWidth = 60; // Lebar untuk kolom ADULT

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("E-Tiket Cultivo", 14, 20);

    // Satu kotak besar yang mencakup kedua bagian DETAIL dan ADULT
    doc.setDrawColor(255, 102, 0); // Warna border oranye
    doc.setLineWidth(0.5);
    doc.rect(14, 30, detailColumnWidth + adultColumnWidth, 50); // Kotak besar menggabungkan DETAIL dan ADULT

    // Garis pemisah antara DETAIL dan ADULT
    const separatorX = 14 + detailColumnWidth; // X posisi garis pemisah (tepat setelah kolom DETAIL)
    doc.line(separatorX, 30, separatorX, 80); // Garis vertikal dari Y=30 ke Y=80

    // Kolom DETAIL
    doc.setFillColor(255, 102, 0); // Warna fill oranye
    doc.rect(14, 30, detailColumnWidth, 10, "F"); // Fill untuk header DETAIL
    doc.setTextColor(255, 255, 255); // Warna teks putih untuk header DETAIL
    doc.setFontSize(12);
    doc.text("DETAIL", 14 + detailColumnWidth / 2, 37, { align: "center" }); // Teks DETAIL di tengah

    // Isi dari kolom DETAIL
    doc.setTextColor(0, 0, 0); // Reset warna teks ke hitam
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.setFont("helvetica", "bold");
    doc.text("VALIDITAS ", 20, 54); // Geser X dari 16 ke 20

    // Teks Normal untuk Tanggal
    doc.setFont("helvetica", "normal");
    doc.text("Hanya berlaku pada " + formatDate(ticket.selected_date), 50, 54); // Geser X dari 44 ke 50

    // Teks Bold untuk Label "JUMLAH"
    doc.setFont("helvetica", "bold");
    doc.text("JUMLAH ", 20, 60); // Geser X dari 16 ke 20

    // Teks Normal untuk Isi Jumlah
    doc.setFont("helvetica", "normal");
    doc.text(ticket.quantity.toString(), 50, 60); // Geser X dari 44 ke 50

    // Teks Bold untuk Label "NAMA"
    doc.setFont("helvetica", "bold");
    doc.text("NAMA ", 20, 66); // Geser X dari 16 ke 20

    // Teks Normal untuk Isi Nama
    doc.setFont("helvetica", "normal");
    doc.text(ticket.name, 50, 66); // Geser X dari 44 ke 50

    // Kolom ADULT (di sebelah kanan kolom DETAIL)
    doc.setFillColor(255, 102, 0); // Warna fill oranye
    doc.rect(14 + detailColumnWidth, 30, adultColumnWidth, 10, "F"); // Fill untuk header ADULT
    doc.setTextColor(255, 255, 255); // Warna teks putih untuk header ADULT
    doc.setFontSize(12);
    doc.text("TIKET", 14 + detailColumnWidth + adultColumnWidth / 2, 37, {
      align: "center",
    });

    // QR Code dan Ticket Code
    const columnCenterX = 14 + detailColumnWidth + adultColumnWidth / 2; // Pusatkan teks dalam kolom ADULT
    doc.setTextColor(0, 0, 0); // Reset warna teks ke hitam
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("ID Tiket", columnCenterX, 58, { align: "center" }); // Teks di tengah kolom
    doc.setFont("helvetica", "normal");
    doc.text(ticket.ticket_code, columnCenterX, 63, { align: "center" });

    const contentEndY = doc.autoTable.previous?.finalY || 80;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`ALAMAT`, 14, contentEndY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8); // Ukuran lebih kecil
    doc.text(`${ticket.agrotourism_address}`, 14, contentEndY + 14);

    const dottedLine =
      "................................................................................";

    doc.text(dottedLine, 14, contentEndY + 17);

    // Kebijakan Pembatalan (Judul)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`KEBIJAKAN PEMBATALAN`, 14, contentEndY + 24);

    // Isi Kebijakan Pembatalan (Normal, tidak bold, lebih kecil)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8); // Ukuran lebih kecil
    doc.text(`Pembatalan tidak dapat dikembalikan.`, 14, contentEndY + 28);
    const dottedLine2 =
      "......................................................................................................................"; // Anda bisa menyesuaikan panjang titik
    doc.text(dottedLine2, 14, contentEndY + 32);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`SYARAT & KETENTUAN`, 14, contentEndY + 38);

    // Menggunakan splitTextToSize untuk memecah teks jika panjang
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8); // Ukuran lebih kecil
    const text1 = `- Akses ke aktivitas hanya akan diberikan untuk tanggal dan waktu atau periode yang tertera pada tiket.`;
    const text2 = `- Operator aktivitas berhak meminta identifikasi pribadi sebelum mengizinkan akses ke aktivitas.`;
    const text3 = `- Operator aktivitas berhak menolak masuk bagi pengunjung yang tidak memiliki pemesanan, reservasi, atau tiket yang sesuai.`;
    const text4 = `- Operator aktivitas berhak menilai kelayakan berdasarkan rentang usia yang ditentukan dan dapat meminta verifikasi usia sebelum memberikan akses ke aktivitas.`;
    const text5 = `- Operator aktivitas berhak menentukan kondisi khusus untuk mengikuti aktivitas apa pun. Operator aktivitas berhak menolak partisipasi dalam aktivitas jika ada kondisi khusus yang tidak terpenuhi.`;
    const text6 = `- Operator aktivitas berhak mengubah hari dan jam operasionalnya kapan saja dan tanpa pemberitahuan sebelumnya. Operator aktivitas tidak akan memberikan penggantian atau pengembalian uang apa pun karena perubahan ini. Rencanakan perjalanan Anda sebelumnya untuk menghindari masalah apa pun.`;
    // const text7 = `- Operator aktivitas, atas kebijakannya sendiri, berhak membatalkan, mengubah semua atau sebagian aktivitas karena alasan di luar kendalinya atau force majeure, termasuk tetapi tidak terbatas pada cuaca, teknis, kesehatan dan keselamatan, dan/atau alasan operasional. Operator aktivitas tidak berkewajiban untuk memberikan penggantian atau pengembalian uang apa pun dalam keadaan ini.`;

    // Menggunakan splitTextToSize untuk memecah teks jika panjang
    const textLines1 = doc.splitTextToSize(text1, 180); // 180 adalah lebar maksimal untuk teks
    const textLines2 = doc.splitTextToSize(text2, 180);
    const textLines3 = doc.splitTextToSize(text3, 180);
    const textLines4 = doc.splitTextToSize(text4, 180);
    const textLines5 = doc.splitTextToSize(text5, 180);
    const textLines6 = doc.splitTextToSize(text6, 180);
    // const textLines7 = doc.splitTextToSize(text7, 180);

    // Menulis teks yang sudah dipotong menjadi beberapa baris
    doc.text(textLines1, 14, contentEndY + 42);
    doc.text(textLines2, 14, contentEndY + 45.3);
    doc.text(textLines3, 14, contentEndY + 48.7);
    doc.text(textLines4, 14, contentEndY + 52.1);
    doc.text(textLines5, 14, contentEndY + 58.7);
    doc.text(textLines6, 14, contentEndY + 65.3);
    // doc.text(textLines7, 14, contentEndY + 60);

    // Footer
    // const footerY = Math.max(
    //   contentEndY + 40,
    //   doc.internal.pageSize.height - 50
    // );

    // Pastikan padding bawah tetap 50

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const pageWidth = doc.internal.pageSize.width; // Mendapatkan lebar halaman
    const footerY = doc.internal.pageSize.height - 20; // Posisi Y untuk garis footer
    doc.setDrawColor(0, 0, 0); // Warna garis hitam
    doc.setLineWidth(0.1); // Set garis sangat tipis
    doc.line(14, footerY, pageWidth - 14, footerY);
    // Save PDF
    const pdfDataUri = doc.output("datauristring");

    // Membuka di tab baru
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width="100%" height="100%" src="${pdfDataUri}"></iframe>`
    );

    doc.save(`${ticket.ticket_code}_ticket.pdf`);
  };

  return (
    <div>
      {/* <button
        onClick={generatePdf}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Download E-Ticket
      </button> */}
      <button
        onClick={generatePdf}
        className="py-2 px-3 flex ml-auto items-center font-semibold"
      >
        <span className="text-xs hidden md:flex md:text-sm mr-2">
          Unduh Tiket
        </span>
        <IoMdDownload />
      </button>
      {pdfUrl && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-3/4 h-3/4">
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              className="border rounded-lg"
              title="E-Ticket Preview"
            ></iframe>
            <button
              onClick={() => setPdfUrl(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPdf;
