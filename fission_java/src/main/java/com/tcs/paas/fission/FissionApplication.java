package com.tcs.paas.fission;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.tcs")
public class FissionApplication {

    public static void main(String[] args) {
        SpringApplication.run(FissionApplication.class, args);
    }

}



