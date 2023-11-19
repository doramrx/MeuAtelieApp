import { useCallback, useState } from "react";
import { Customer } from "../entities/Customer";
import { useCustomerModel } from "../models/useCustomerModel";
import { useCustomerAdapter } from "../adapters/customerAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface CustomerViewModelData {
  customers: Customer[];
  addCustomerIntoList: (customer: Customer) => void;
  updateCustomerFromList: (customer: Customer) => void;
  getCustomerById: (id: number) => Promise<Customer>;
  deleteCustomer: (id: number) => Promise<boolean>;
  updateCustomer: (id: number, name: string, phone: string) => Promise<void>;
  createNewCustomer: (name: string, phone: string) => Promise<number>;
  nextPage: () => void;
}

interface Props {
  shouldFetch: boolean;
}

export function useCustomerViewModel(props?: Props): CustomerViewModelData {
  const PAGINATION_LIMIT = 20;
  const [page, setPage] = useState(1);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const model = useCustomerModel();
  const adapter = useCustomerAdapter();

  async function fetchCustomers(): Promise<void> {
    console.log("[ViewModel] Fetching customers...");
    try {
      const offset = (page - 1) * PAGINATION_LIMIT;
      const rawCustomers = await model.getCustomers(PAGINATION_LIMIT, offset);

      if (rawCustomers.length !== 0) {
        const customersList = adapter.mapToEntityList(rawCustomers);

        setCustomers((prevCustomers) => {
          return [...prevCustomers, ...customersList];
        });
      }
    } catch {
      return Promise.reject();
    }
  }

  async function getCustomerById(id: number): Promise<Customer> {
    try {
      const rawCustomerData = await model.getCustomerById(id);
      const customer = adapter.mapToEntity(rawCustomerData);

      return Promise.resolve(customer);
    } catch {
      return Promise.reject();
    }
  }

  async function deleteCustomer(id: number): Promise<boolean> {
    console.log("[ViewModel] Deleting customer...");
    try {
      const deletedCustomerId = await model.deleteCustomer(id);

      setCustomers((prevCustomers) => {
        return prevCustomers.filter(
          (customer) => customer.id !== deletedCustomerId
        );
      });

      return Promise.resolve(true);
    } catch {
      return Promise.reject(false);
    }
  }

  async function createNewCustomer(
    name: string,
    phone: string
  ): Promise<number> {
    if (name.trim().length === 0) {
      return Promise.reject();
    }

    if (phone.trim().length === 0) {
      return Promise.reject();
    }

    try {
      return await model.createNewCustomer(name, phone);
    } catch {
      return Promise.reject();
    }
  }

  function addCustomerIntoList(customer: Customer) {
    setCustomers((prevCustomers) => {
      return [...prevCustomers, customer];
    });
  }

  function updateCustomerFromList(customer: Customer) {
    setCustomers((prevCustomers) => {
      return prevCustomers.map((oldCustomer) => {
        return oldCustomer.id === customer.id ? customer : oldCustomer;
      });
    });
  }

  function nextPage() {
    console.log("[ViewModel] Moving to the next page...");
    setPage((prevPage) => prevPage + 1);
  }

  async function updateCustomer(
    id: number,
    name: string,
    phone: string
  ): Promise<void> {
    if (id === null) {
      return Promise.reject();
    }

    if (name === null || name.trim().length === 0) {
      return Promise.reject();
    }

    if (phone === null || phone.trim().length === 0) {
      return Promise.reject();
    }

    await model.updateCustomer(id, name, phone);
  }

  useFocusEffect(
    useCallback(() => {
      if (props?.shouldFetch) {
        fetchCustomers();
        console.log("Fetching customers");
      }
    }, [page])
  );

  return {
    customers,
    addCustomerIntoList,
    updateCustomerFromList,
    getCustomerById,
    nextPage,
    deleteCustomer,
    createNewCustomer,
    updateCustomer,
  };
}
