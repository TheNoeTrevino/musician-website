import { UserDTO } from "../dtos/dtos";
const baseUrl = process.env.BACKEND_URL;

// FIX: remove alerts once this is all settled
export const UserService = {
  async getUserById(userId: number): Promise<UserDTO> {
    try {
      const response = await fetch(
        `${baseUrl}/users/user/${userId}`,
        {
          method: "GET",
        },
      );
      console.log(`fetching user: ${userId}`);

      if (!response.ok) {
        alert(`Something went wrong fetching user: ${userId}`);
      }

      const userData: UserDTO = await response.json();

      console.log(response);

      return userData;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Something went wrong fetching the user with id: ${userId}. Error: ${error}`,
      );
    }
  },

  async deleteUserById(userId: number): Promise<UserDTO> {
    try {
      const response = await fetch(
        `${baseUrl}/users/user/${userId}`,
        {
          method: "DELETE",
        },
      );

      console.log(`deleting user: ${userId}`);

      if (!response.ok) {
        alert(
          `response not ok, Something went wrong deleting the user with id: ${userId}`,
        );
      }

      const userData: UserDTO = await response.json();

      console.log(response);

      return userData;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Something went wrong deleting the user with id: ${userId}. Error: ${error}`,
      );
    }
  },

  async getAllUsersByRole(role: string): Promise<UserDTO[]> {
    try {
      const response = await fetch(
        `${baseUrl}/users/?role=${role}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching users with role ${role}: ${response.statusText}`,
        );
      }

      const users: UserDTO[] = await response.json();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error(
        `Something went wrong fetching the users. Error: ${error}`,
      );
    }
  },

  async getAllUsers(orderBy: string, sortOrder: string): Promise<UserDTO[]> {
    try {
      const params = new URLSearchParams({
        orderBy: orderBy,
        sortOrder: sortOrder,
      });

      const response = await fetch(
        `${baseUrl}/users/?${params.toString()}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        throw new Error("could not fetch all users");
      }

      const users: UserDTO[] = await response.json();

      return users;
    } catch (error) {
      throw new Error(`could not fetch all users: ${error}`);
    }
  },
};
