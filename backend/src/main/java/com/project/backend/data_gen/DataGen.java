package com.project.backend.data_gen;

import com.github.javafaker.Faker;
import com.project.backend.models.Piece;
import com.project.backend.models.Users;
import com.project.backend.repositories.PiecesRepository;
import com.project.backend.repositories.UserRepository;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataGen {

  @Autowired
  PiecesRepository pieceRepo;

  @Autowired
  UserRepository userRepo;

  Faker faker = new Faker();

  Random rand = new Random();

  // NOTE: todos are missing information from sebastian
  @Transactional(rollbackFor = Exception.class)
  // @Bean // NOTE: add this if you want to generate the sample piece data
  public DataGen generateSampleData() {
    // adding the pieces he has written
    List<Piece> piecesList = new ArrayList<>();

    piecesList.add(
        new Piece(
            "Standing on The Shoulders of Giants",
            "Sebastian Havner", 50.00,
            "Standing on The Shoulders of Giants is a piece for two marimba soloists with a backing percussion ensemble. The piece is written in a way that while the soloists are in the spotlight, the whole ensemble is very involved andrather than just support the soloists, they have prominent voices that create the piece’s energy.To me, the beauty of music is the emotions it can bring with it. There is a certain almost larger than life feeling Ihave experienced at many points listening to or performing music, when you are completely pulled into a piece itcan be a profound experience. I wrote Standing on the Shoulders of Giants with the intent to invoke thoseemotions in the audience and players while listening or performing.",
            2023, false, true, 8, 6, Duration.ofMinutes(8)));

    piecesList.add(
        new Piece("Celestial",
            "Sebastian Havner", 30.00,
            "Celestial is a percussion sextet written for my alma mater, Berkner Highschool. My intention with this piece was to write a beginner-intermediate level percussion ensemble with the energy and feeling of a professional levelpiece so students can have an enjoyable experience and eventually seamlessly transition to the evolving modernplaystyle. The piece does not follow a strict storyline but one can loosely interpret it as an adventure into space and thereturn back home. It encapsulates the imagery of the cosmos as well as the unknown factor of what dangerscould be out there.",
            2024, true, true, 6, 3, Duration.ofMinutes(4)));

    piecesList.add(
        new Piece("Memento Mori",
            "Sebastian Havner", 40.00,
            "Memento Mori is a Latin phrase translating to “Remember that you must die”. I wrote this piece to convey the many different feelings that this idea can cause in a person. At face value, the idea of death can be a very scary and dark thought, although without death, the meaning of life is diminished. Memento Mori aims to show the constant convolution of how death is viewed, while generally intense and “negative” at times the piece diverges to showcase the beauty of death as the finale to someone's story, rather than an undesirable end. I purposefully switch between different tones within the music to convey my own uncertainty with the idea of death. Memento Mori is written for solo marimba with a percussion quartet accompaniment. It is an advanced piece with individual challenges as well as difficult ensemble moments. The soloist weaves in and out of the spotlight, keeping an interesting blend of soloistic moments and full ensemble ideas. I intended to create a compelling soundscape between the warmer timbre of the marimba with the bright sounds of the metallic instruments backing up the soloist, driven forward by the energy of the hand drumming.",
            2024, false, true, 5, 6, Duration.ofMinutes(6)));

    piecesList.add(
        new Piece("Athanatos",
            "Sebastian Havner", 20.00,
            "WIP",
            2025, true, false, 1, 6, Duration.ofMinutes(6)));

    piecesList.add(
        new Piece("Azure",
            "Sebastian Havner", 30.00,
            "WIP",
            2025, false, false, 2, 6, Duration.ofMinutes(6)));

    piecesList.stream().forEach(pieceRepo::save);

    // adding us
    List<Users> userList = new ArrayList<>();
    userList.add(new Users("Noe", "Trevino", "noe123", "noe.mail.com", new SimpleGrantedAuthority("user")));
    userList.add(new Users("Enna", "Trevino", "enna123", "enna.mail.com", new SimpleGrantedAuthority("user")));
    userList.add(
        new Users("Sebastian", "Havner", "sebastian123", "sebastian.mail.com", new SimpleGrantedAuthority("user")));

    // adding fake random users
    for (int i = 0; i < 100; i++) {
      Users user = new Users(faker.name().firstName(), faker.name().lastName(), faker.internet().password(),
          faker.internet().emailAddress(), new SimpleGrantedAuthority("user"));
      userList.add(user);
    }

    userList.forEach(userRepo::save);
    piecesList.forEach(pieceRepo::save);

    // make it the actual ones in the database since they are now saved
    userList = userRepo.findAll();
    return null;
  }
}
