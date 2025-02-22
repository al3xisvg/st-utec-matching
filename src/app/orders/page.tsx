/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button } from "antd";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      setOrders([{ key: "1", ...JSON.parse(data) }]);
    }
  }, []);

  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    {
      title: "Acción",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => router.push(`/order/${record.codigo}`)}
        >
          Ver Detalle
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Lista de Pedidos</h2>
      <Table dataSource={orders} columns={columns} />
    </div>
  );
}
