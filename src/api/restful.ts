/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

import config from "@/config/app";

interface IRequirementDB {
  _id: string;
  nombre: string;
  codigo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IProductDB {
  _id: string;
  nombre: string;
  unidad: string;
  cantidad: number;
  marca: string;
  requirementId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ResponseCreateReq {
  message?: string | undefined;
  success?: boolean | undefined;
  data?: {
    requirement: IRequirementDB;
    products: IProductDB;
  };
}

interface IProduct {
  nombre: string;
  unidad: string;
  cantidad: number;
  marca: string;
}

interface IRequirement {
  nombre: string;
  codigo: string;
  productos: IProduct[];
}

class ApiService {
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: config.apiUrl,
      timeout: 5000,
    });
  }

  createRequirement = async (
    requirement: IRequirement
  ): Promise<ResponseCreateReq | null> => {
    try {
      const response = await this.service.post(
        "/create/requirement-with-products",
        requirement
      );
      const res: ResponseCreateReq = response.data;
      return res;
    } catch (error) {
      console.error("createRequirement - creatWithProducts", error);
      return null;
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
