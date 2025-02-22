/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Table,
  Card,
  message,
  Typography,
  Flex,
} from "antd";

import ApiService from "@/api/restful";

import "@ant-design/v5-patch-for-react-19";

export default function Formulario() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [productForm] = Form.useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleAddProduct = (values: any) => {
    setProducts([...products, { key: Date.now(), ...values }]);
    productForm.resetFields();
  };

  const handleSubmit = (values: any) => {
    if (products.length === 0) {
      message.error("Agrega al menos un producto antes de enviar.");
      return;
    }

    values.nombre = values.titulo;
    const formData = { ...values, productos: products };
    console.log("Formulario enviado:", formData);

    setLoading(true);
    ApiService.createRequirement(formData)
      .then((r) => {
        console.log("--r--");
        console.log(r);
        if (!r?.data) {
          console.error("--err");
          console.log(r?.message);
          message.error("Formulario enviado fallo.");
          return;
        }
        message.success("Formulario enviado correctamente.");
        router.push(`/requirements/${r.data.requirement._id}`);
      })
      .catch((err) => {
        console.error("--err");
        console.log(err);
        message.error("Formulario enviado fallo.");
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: "Nombre Producto",
      dataIndex: "nombre",
      key: "nombreProducto",
    },
    {
      title: "Unidad de Medida",
      dataIndex: "unidad",
      key: "unidadMedida",
    },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
  ];

  return (
    <div
      style={{
        padding: 20,
        background: "#141414",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Typography.Title style={{ color: "#fff" }}>
        Formulario de Productos
      </Typography.Title>

      {/* Sección 1: Datos Principales */}
      <Card style={{ background: "#1f1f1f", marginBottom: 20 }}>
        <Form form={form} onFinish={handleSubmit} layout="horizontal">
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Información General
          </Typography.Title>
          <Form.Item
            name="titulo"
            label={<span style={{ color: "#fff" }}>Nombre</span>}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="codigo"
            label={<span style={{ color: "#fff" }}>Código</span>}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Card>

      {/* Sección 2: Agregar Productos */}
      <Card style={{ background: "#1f1f1f", marginBottom: 20 }}>
        <Typography.Title level={4} style={{ color: "#fff" }}>
          Agregar Productos
        </Typography.Title>
        <Form
          form={productForm}
          onFinish={handleAddProduct}
          layout="horizontal"
        >
          <Form.Item
            name="nombre"
            label={<span style={{ color: "#fff" }}>Nombre de Producto</span>}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Flex justify="space-between">
            <Form.Item
              name="unidad"
              label={<span style={{ color: "#fff" }}>Unidad de Medida</span>}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cantidad"
              label={<span style={{ color: "#fff" }}>Cantidad</span>}
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="marca"
              label={<span style={{ color: "#fff" }}>Marca</span>}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Agregar Producto
          </Button>
        </Form>
      </Card>

      {/* Tabla de Productos */}
      <Table
        dataSource={products}
        columns={columns}
        style={{ background: "#222" }}
      />

      {/* Botón Final para Enviar */}
      <Button
        type="primary"
        loading={isLoading}
        onClick={() => form.submit()}
        style={{ marginTop: 20 }}
      >
        Enviar Formulario
      </Button>
    </div>
  );
}
