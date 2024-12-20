import { UserService } from "../services/UserService";

const Home = () => {
  const logGetUser = () => {
    console.log(UserService.getUserById(1));
  };
  const logDeleteUser = () => {
    console.log(UserService.deleteUserById(1));
  };
  const logGetUserByRole = () => {
    console.log(UserService.getAllUsersByRole("ADMIN"));
  };
  return (
    <>
      <div className="bg-red-500 font-semibold ">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Vestibulum nisi leo
        condimentum urna iaculis dolor congue parturient. Sociosqu aliquam nam
        in nascetur sapien ex. Venenatis lobortis orci pretium volutpat libero
        curae pretium nisl vestibulum. Dolor interdum netus sed id commodo.
        Nulla vulputate nostra rhoncus senectus a quam elementum mattis. Eget
        posuere malesuada platea elit magna lacus; felis adipiscing. Natoque et
        vitae non vulputate euismod sodales ex. Semper nec molestie velit lectus
        conubia placerat vulputate. Quis maecenas faucibus cras; aenean
        ullamcorper in. Non condimentum nulla fringilla tempus diam id. Potenti
        tristique vitae magnis feugiat vestibulum. Ullamcorper fringilla
        tincidunt metus curae arcu. Efficitur elementum nascetur et finibus
        egestas inceptos libero mi. Tempor facilisis sagittis magnis sodales
        praesent; primis quam libero. Viverra sed purus est molestie et finibus.
        Molestie montes eleifend pellentesque ultrices gravida tempor. Habitasse
        sit ultricies adipiscing lacinia consectetur. Turpis habitant elementum
        dictumst lacus aliquam penatibus volutpat feugiat. Auctor ut pretium
        ipsum maecenas malesuada erat donec. Donec aliquam ut elit senectus
        curabitur bibendum. Ad eu ultricies nullam suspendisse mi pulvinar proin
        pretium. Morbi hendrerit maximus ut tincidunt ac dis arcu nulla. Magnis
        ultricies nunc magnis phasellus maximus. Enim habitasse fames vulputate
        vulputate habitant auctor cubilia mollis. Conubia tortor bibendum
        himenaeos commodo ultrices mattis non sociosqu conubia. Leo suscipit
        sapien nisl curabitur lacinia; euismod nascetur magnis ipsum. Molestie
        porttitor faucibus tristique convallis eros fames faucibus amet. At per
        nunc primis; quis metus nullam nibh. Sem eget laoreet dolor mi leo
        tellus magna! Dignissim dignissim taciti, augue luctus libero ipsum
        nullam. Aliquam litora bibendum curabitur, ultricies suscipit nostra
        gravida parturient turpis. Sit magna taciti convallis sem nam. Mi proin
        a risus laoreet ridiculus id imperdiet. Sit taciti vivamus quam inceptos
        fermentum integer consectetur. Odio diam phasellus enim mollis donec
        tincidunt id eget. Ridiculus arcu nascetur; parturient faucibus
        venenatis tincidunt duis nibh.
      </div>
      <button onClick={logGetUser}>Get User</button>
      <button onClick={logDeleteUser}>Delete User</button>
      <button onClick={logGetUserByRole}>Get User by role</button>
    </>
  );
};

export default Home;
