"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Flex, message, Spin, Tooltip } from "antd";

import ApiService, {
  IProductDB,
  IProductMatched,
  IRequirementDB,
} from "@/api/restful";

import "@ant-design/v5-patch-for-react-19";

const RequirementDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [requirement, setRequirement] = useState<IRequirementDB>({
    _id: "",
    codigo: "",
    nombre: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [products, setProducts] = useState<IProductDB[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [matchedProducts, setMatchedProducts] = useState<IProductMatched[]>([]);

  const matchProducts = () => {
    // Simulación de cruce con inventario (puedes conectar con API)
    const matched = products.map<IProductMatched>((product: IProductDB) => ({
      ...product,
      similarity: Math.floor(Math.random() * 100),
      inventoryId: "1234",
      inventoryName: "Producto X",
    }));
    setMatchedProducts([...matched]);
  };

  useEffect(() => {
    if (id) {
      ApiService.obtainRequirement(id.toString())
        .then((r) => {
          if (!r?.data) {
            message.error("ocurrio un error.");
            return;
          }
          const aux = r.data.requirement;
          setRequirement(aux);
          setProducts([...r.data.products]);
        })
        .catch((err) => {
          console.log("--err--");
          console.log(err);
          message.error("fallo.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <Flex gap={8}>
        <Tooltip title="Ir a Requerimientos">
          <Button type="dashed" onClick={() => router.push("/requirements")}>
            {"<-"}
          </Button>
        </Tooltip>
        <h1 className="text-2xl font-bold mb-4">Requerimiento de Productos</h1>
      </Flex>

      <Spin spinning={isLoading} />

      {/* Sección de Inputs */}
      <Flex justify="space-between" gap={8} className="mb-4">
        <Flex vertical className="w-1/2">
          <span>Nombre:</span>
          <input
            type="text"
            placeholder="Nombre del requerimiento"
            className="border p-2 w-full rounded"
            readOnly
            value={requirement.nombre}
          />
        </Flex>
        <Flex vertical className="w-1/2">
          <span>Código:</span>
          <input
            type="text"
            placeholder="Fecha"
            className="border p-2 w-full rounded"
            readOnly
            value={requirement.codigo}
          />
        </Flex>
      </Flex>

      {/* Tabla de Productos */}
      <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre Producto</th>
            <th className="border p-2">Unidad</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: IProductDB, index: number) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  value={product.nombre}
                  disabled
                  className="border p-1 w-full rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={product.unidad}
                  disabled
                  className="border p-1 w-full rounded text-center"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={product.cantidad}
                  disabled
                  className="border p-1 w-full rounded text-center"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={product.marca}
                  disabled
                  className="border p-1 w-full rounded text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón de Match */}
      <div className="mt-4">
        <button
          onClick={matchProducts}
          className="bg-green-500 text-white p-2 rounded"
        >
          Match de Productos
        </button>
      </div>

      {/* Tabla con Cruce de Inventario */}
      {matchedProducts.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Resultados del Cruce
          </h2>
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Nombre Producto</th>
                <th className="border p-2">Unidad</th>
                <th className="border p-2">Cantidad</th>
                <th className="border p-2">Marca</th>
                <th className="border p-2">Cruce con Inventario</th>
                <th className="border p-2">% Similitud</th>
              </tr>
            </thead>
            <tbody>
              {matchedProducts.map((product: IProductMatched, index) => (
                <tr key={index}>
                  <td className="border p-2">{product.nombre}</td>
                  <td className="border p-2 text-center">{product.unidad}</td>
                  <td className="border p-2 text-center">{product.cantidad}</td>
                  <td className="border p-2 text-center">{product.marca}</td>
                  <td className="border p-2 text-center">
                    {product.inventoryName}
                  </td>
                  <td className="border p-2 text-center">
                    {product.similarity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RequirementDetails;
