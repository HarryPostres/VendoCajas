import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import "../css/OrderDetail.css";

export default function OrderDetail() {
    const { id } = useParams();
    const [orden, setOrden] = useState(null);
    const [svg, setSvg] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const docRef = doc(db, "ordenes", id);
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    const data = snap.data();
                    setOrden(data);
                    generarSVG(data);
                } else {
                    console.warn("No se encontró la orden");
                }
            } catch (err) {
                console.error("Error al obtener la orden", err);
            }
        };
        fetchOrder();
    }, [id]);

    const generarSVG = (orden) => {
        const fecha = new Date(orden.fecha).toLocaleString();

        const productosTexto = orden.items
            .map(
                (p) =>
                    `${p.nombre.padEnd(20)} x${p.cantidad} $${(
                        p.precio * p.cantidad
                    ).toFixed(2)}`
            )
            .join("\n");

        const texto = `
*** VENDOCAJAS ***
COMPROBANTE DE COMPRA
--------------------------------
ID: ${id}
Fecha: ${fecha}
--------------------------------
Cliente:
${orden.comprador.nombre}
${orden.comprador.email}
DNI: ${orden.comprador.dni}
Dirección:
${orden.comprador.direccion.calle}
${orden.comprador.direccion.localidad}, ${orden.comprador.direccion.provincia}
CP: ${orden.comprador.direccion.cp}
--------------------------------
PRODUCTOS
${productosTexto}
--------------------------------
TOTAL: $${orden.total.toFixed(2)}
Pago: **** ${orden.pago.cardLast4}
--------------------------------
GRACIAS POR SU COMPRA
`;

        const lines = texto.split("\n");
        const lineHeight = 18;
        const width = 300;
        const height = lines.length * lineHeight + 30;

        const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <g font-family="monospace" font-size="14">
          ${lines
                .map(
                    (line, i) =>
                        `<text x="10" y="${20 + i * lineHeight}">${line}</text>`
                )
                .join("")}
        </g>
      </svg>
    `;

        setSvg(svgContent);
    };

    if (!orden) return <h2 className="cargando-ticket">Cargando ticket...</h2>;

    return (
        <div className="Ticket-container">
            <h1>Ticket de compra</h1>

            <div
                className="ticket-svg"
                dangerouslySetInnerHTML={{ __html: svg }}
            />

            <p>Agradecemos tu compra, tu pedido llegará a tus puertas en un plazo de 7 a 15 días, te informaremos vía mail de todas formas, descarga tu ticket, es ahora, o nunca...</p>

            <button
                className="btn-descargar"
                onClick={() => {
                    const blob = new Blob([svg], { type: "image/svg+xml" });
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `ticket-${id}.svg`;
                    a.click();

                    URL.revokeObjectURL(url);
                }}
            >
                Descargar Ticket
            </button>
        </div>
    );
}
