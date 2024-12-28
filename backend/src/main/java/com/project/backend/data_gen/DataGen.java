package com.project.backend.data_gen;
import com.github.javafaker.Faker;
import com.project.backend.eums.Role;
import com.project.backend.models.Piece;
import com.project.backend.models.Users;
import com.project.backend.repositories.OrderRepository;
import com.project.backend.repositories.PiecesRepository;
import com.project.backend.repositories.UserRepository;
import com.project.backend.models.Order;
import jakarta.annotation.PostConstruct;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
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
            "Sebastian Havner", 50.00, 2023, false, true, 8, 6, Duration.ofMinutes(8)));

    piecesList.add(
        new Piece("Celestial",
            "Sebastian Havner", 30.00, 2024, true, true, 6, 3, Duration.ofMinutes(4)));

    piecesList.add(
        new Piece("Memento Mori",
            "Sebastian Havner", 50.00, 2024, false, true, 5, 6, Duration.ofMinutes(6)));

    piecesList.add(
        new Piece("Athanatos",
            "Sebastian Havner", 20.00, 2025, true, false, 1, 6, Duration.ofMinutes(6)));

    piecesList.add(
        new Piece("Azure",
            "Sebastian Havner", 25.00, 2025, false, false, 2, 6, Duration.ofMinutes(6)));

    piecesList.stream().forEach(pieceRepo::save);

  // helper functions
  private Order generateFakeOrder(Users user) {
    List<Piece> allPieces = pieceRepo.findAll();
    List<Piece> orderPieces = new ArrayList<Piece>();
    Order fakeOrder = new Order();

    for (int i = 0; i < rand.nextInt(allPieces.size()); i++) {
      int randomIndex = rand.nextInt(allPieces.size());
      Piece piece =  allPieces.get(randomIndex);
      orderPieces.add(piece);
      if (piece.getOrders() == null) {
        piece.setOrders(new HashSet<>());
      }
      // this is needed for some reason, or the bidirectional relationship will not be set
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
