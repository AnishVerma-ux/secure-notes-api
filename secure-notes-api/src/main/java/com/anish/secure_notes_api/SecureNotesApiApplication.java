package com.anish.secure_notes_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
@SpringBootApplication
public class SecureNotesApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecureNotesApiApplication.class, args);
    }


    @Bean
    CommandLineRunner testEnv() {
        return args -> {
            System.out.println("DB USER = " + System.getenv("DB_USERNAME"));
            System.out.println("MAIL USER = " + System.getenv("MAIL_USERNAME"));
        };
    }


}