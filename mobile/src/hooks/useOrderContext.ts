import { useContext } from "react";

import { OrderContext } from "../contexts/OrderContext";

export const useOrderContext = () => useContext(OrderContext);
