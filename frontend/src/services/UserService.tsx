import { UserDTO } from "../dtos/dtos";

export const UserService = {
  async getUserById(userId: number): Promise<UserDTO> {
    try {
      const response = await fetch(
        `http://localhost:8080/users/user/${userId}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        alert("everything is all good");
      }

      const userData: UserDTO = await response.json();

      console.log(response);

      return userData;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong fetching the user information");

  async deleteUserById(userId: number): Promise<UserDTO> {
    try {
      const response = await fetch(
        `http://localhost:8080/users/user/${userId}`,
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
        `Something went wrong deleting the user with id: ${userId}`,
      );
    }
  },

    }
  },
};
