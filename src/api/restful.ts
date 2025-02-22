import axios, { AxiosInstance } from "axios";

import config from "@/config/app";

export interface IRequirementDB {
  _id: string;
  nombre: string;
  codigo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProductDB {
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

export interface IProductMatched extends IProductDB {
  similarity: number;
  inventoryName: string;
  inventoryId: string;
}

export interface ReqDetails {
  message?: string | undefined;
  success?: boolean | undefined;
  data?: {
    requirement: IRequirementDB;
    products: IProductDB[];
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
  ): Promise<ReqDetails | null> => {
    try {
      const response = await this.service.post(
        "/create/requirement-with-products",
        requirement
      );
      const res: ReqDetails = response.data;
      return res;
    } catch (error) {
      console.error("createRequirement - creatWithProducts", error);
      return null;
    }
  };

  listRequirements = async (): Promise<IRequirementDB[] | null> => {
    try {
      const response = await this.service.get(`/list/requirements`);
      const res: IRequirementDB[] = response.data.data.requirementsDB;
      return res;
    } catch (error) {
      console.error("listRequirements", error);
      return null;
    }
  };

  obtainRequirement = async (
    requirementId: string
  ): Promise<ReqDetails | null> => {
    try {
      const response = await this.service.get(
        `/obtain/requirement-with-products/${requirementId}`
      );
      const res: ReqDetails = response.data;
      return res;
    } catch (error) {
      console.error("obtainRequirement - listWith Products", error);
      return null;
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
