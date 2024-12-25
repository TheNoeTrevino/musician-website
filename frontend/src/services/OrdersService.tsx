import { CreateOrderDTO, OrderDTO } from "../dtos/dtos";

export const OrderService = {
  async getOrderById(orderId: number): Promise<OrderDTO> {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/order/${orderId}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        alert("Something went wrong fetching order");
      }

      const orderData: OrderDTO = await response.json();

      return orderData;
    } catch (error) {
      throw new Error(
        `Something went wrong with fetching order with id: ${orderId}. Error: ${error}`,
      );
    }
  },

  async deleteOrderById(orderId: number): Promise<OrderDTO> {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/order/${orderId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        alert("something went fetching order");
      }

      const orderDTO: OrderDTO = await response.json();

      return orderDTO;
    } catch (error) {
      throw new Error(
        `something went wrong fetching order with id: ${orderId}. Error: ${error}`,
      );
    }
  },

  async getOrdersByUserId(userId: number): Promise<OrderDTO[]> {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/order/user/${userId}`,
        { method: "GET" },
      );
      if (response.ok) {
        alert("something went wrong fetch order by user");
      }

      const ordersData: OrderDTO[] = await response.json();

      return ordersData;
    } catch (error) {
      throw new Error("something went wrong fetch orders for user");
    }
  },
};
