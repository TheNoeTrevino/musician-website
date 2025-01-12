package com.project.backend.data_gen;

import com.github.javafaker.Faker;
import com.project.backend.eums.Role;
import com.project.backend.models.Piece;
import com.project.backend.models.Users;
import com.project.backend.repositories.OrderRepository;
import com.project.backend.repositories.PiecesRepository;
import com.project.backend.repositories.UserRepository;
import com.project.backend.models.Order;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataGen {

  @Autowired
  PiecesRepository pieceRepo;

  @Autowired
  UserRepository userRepo;

  @Autowired
  OrderRepository orderRepo;

  Faker faker = new Faker();

  Random rand = new Random();

  // NOTE: todos are missing information from sebastian
  @Transactional(rollbackFor = Exception.class)
  @Bean
  public DataGen generateSampleData() {
    // adding the pieces he has written
    List<Piece> piecesList = new ArrayList<>();

    piecesList.add(
        new Piece(
            "Standing on The Shoulders of Giants",
            "Sebastian Havner", 50.00,
            "Standing on The Shoulders of Giants is a piece for two marimba soloists with a backing percussion ensemble.The piece is written in a way that while the soloists are in the spotlight, the whole ensemble is very involved andrather than just support the soloists, they have prominent voices that create the piece’s energy.To me, the beauty of music is the emotions it can bring with it. There is a certain almost larger than life feeling Ihave experienced at many points listening to or performing music, when you are completely pulled into a piece itcan be a profound experience. I wrote Standing on the Shoulders of Giants with the intent to invoke thoseemotions in the audience and players while listening or performing.",
            2023, false, true, 8, 6, Duration.ofMinutes(8)));

    piecesList.add(
        new Piece("Celestial",
            "Sebastian Havner", 30.00,
            "Celestial is a percussion sextet written for my alma mater Berkner Highschool. My intention with this piece wasto write a beginner-intermediate level percussion ensemble with the energy and feeling of a professional levelpiece so students can have an enjoyable experience and eventually seamlessly transition to the evolving modernplaystyle.The piece does not follow a strict storyline but one can loosely interpret it as an adventure into space and thereturn back home. It encapsulates the imagery of the cosmos as well as the unknown factor of what dangerscould be out there.",
            2024, true, true, 6, 3, Duration.ofMinutes(4)));

    piecesList.add(
        new Piece("Memento Mori",
            "Sebastian Havner", 50.00,
            "Memento Mori is a Latin phrase translating to “Remember that you must die”. I wrote this piece to convey the many different feelings that this idea can cause in a person. At face value, the idea of death can be a very scary and dark thought, although without death, the meaning of life is diminished. Memento Mori aims to show the constant convolution of how death is viewed, while generally intense and “negative” at times the piece diverges to showcase the beauty of death as the finale to someone's story, rather than an undesirable end. I purposefully switch between different tones within the music to convey my own uncertainty with the idea of death. Memento Mori is written for solo marimba with a percussion quartet accompaniment. It is an advanced piece with individual challenges as well as difficult ensemble moments. The soloist weaves in and out of the spotlight, keeping an interesting blend of soloistic moments and full ensemble ideas. I intended to create a compelling soundscape between the warmer timbre of the marimba with the bright sounds of the metallic instruments backing up the soloist, driven forward by the energy of the hand drumming.",
            2024, false, true, 5, 6, Duration.ofMinutes(6)));

    piecesList.add(
        new Piece("Athanatos",
            "Sebastian Havner", 20.00,
            "WIP",
            2025, true, false, 1, 6, Duration.ofMinutes(6)));

    piecesList.add(
        new Piece("Azure",
            "Sebastian Havner", 25.00,
            "WIP",
            2025, false, false, 2, 6, Duration.ofMinutes(6)));

    piecesList.stream().forEach(pieceRepo::save);

    // adding us
    List<Users> userList = new ArrayList<>();
    userList.add(new Users("Noe", "Trevino", "noe123", "noe.mail.com", Role.ADMIN));
    userList.add(new Users("Enna", "Trevino", "enna123", "enna.mail.com", Role.ADMIN));
    userList.add(new Users("Sebastian", "Havner", "sebastian123", "sebastian.mail.com", Role.ADMIN));

    // adding fake random users
    for (int i = 0; i < 100; i++) {
      Users user = new Users(faker.name().firstName(), faker.name().lastName(), faker.internet().password(),
          faker.internet().emailAddress(), Role.USER);
      userList.add(user);
    }

    userList.forEach(userRepo::save);

    // make it the actual ones in the database since they are now saved
    userList = userRepo.findAll();
    userList.forEach(user -> user.setOrders(generateFakeOrderList(user)));
    return null;
  }

  // helper functions
  private Order generateFakeOrder(Users user) {
    List<Piece> allPieces = pieceRepo.findAll();
    List<Piece> orderPieces = new ArrayList<Piece>();
    Order fakeOrder = new Order();

    for (int i = 0; i < rand.nextInt(allPieces.size()); i++) {
      int randomIndex = rand.nextInt(allPieces.size());
      Piece piece = allPieces.get(randomIndex);
      orderPieces.add(piece);
      if (piece.getOrders() == null) {
        piece.setOrders(new HashSet<>());
      }
      // this is needed for some reason, or the bidirectional relationship will not be
      // set
      piece.getOrders().add(fakeOrder);
    }

    Double sum = orderPieces
        .stream()
        .mapToDouble(piece -> piece.getPrice())
        .sum();

    // something going wrong here
    fakeOrder.setPrice(sum).setPieces(orderPieces).setUser(user);
    fakeOrder = orderRepo.save(fakeOrder);
    orderPieces.forEach(piece -> pieceRepo.save(piece));
    return fakeOrder;
  }

  private List<Order> generateFakeOrderList(Users user) {
    List<Order> fakeOrderList = new ArrayList<>();

    for (int i = 0; i < rand.nextInt(2) + 1; i++) {
      fakeOrderList.add(generateFakeOrder(user));
    }
    return fakeOrderList;
  }
}
