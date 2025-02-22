"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Spin, Flex, Badge, Tooltip } from "antd";

import ApiService, { IRequirementDB } from "@/api/restful";

import "@ant-design/v5-patch-for-react-19";

const ListadoPage = () => {
  const router = useRouter();
  const [requirements, setRequirements] = useState<IRequirementDB[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    ApiService.listRequirements()
      .then((r) => {
        if (!r) {
          console.error("ocurrio eun erorr");
          return;
        }
        setRequirements([...r]);
      })
      .catch((err) => {
        console.error("--err--");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Flex vertical>
        <Flex gap={8}>
          <Tooltip title="Ir a Crear Requerimiento">
            <Button type="dashed" onClick={() => router.push("/")}>
              {"<-"}
            </Button>
          </Tooltip>
          <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
        </Flex>

        <Spin spinning={isLoading} />

        <div
          className="overflow-y-auto border rounded-lg p-4"
          style={{ height: 800 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {requirements.map((requirement, index: number) => (
              <Badge key={index} count={index + 1}>
                <Card
                  key={requirement._id}
                  title={requirement.nombre}
                  variant="borderless"
                  className="shadow-md"
                >
                  <p className="text-gray-500">{requirement.codigo}</p>
                  <Button
                    type="primary"
                    onClick={() =>
                      router.push(`/requirements/details?id=${requirement._id}`)
                    }
                  >
                    Ir al detalle
                  </Button>
                </Card>
              </Badge>
            ))}
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default ListadoPage;
