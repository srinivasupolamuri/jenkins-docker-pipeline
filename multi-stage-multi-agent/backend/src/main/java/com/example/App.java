package com.example;

public class App {

    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("Backend application started");
        System.out.println("10 + 20 = " + add(10, 20));
    }
}
