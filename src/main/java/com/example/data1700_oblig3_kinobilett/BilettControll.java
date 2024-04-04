package com.example.data1700_oblig3_kinobilett;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BilettControll {
    private final List<Biletter> bilettList=new ArrayList<>();
    @GetMapping("hentbiletter")
    public List<Biletter> alleBiletter(){
        return bilettList;
    }
    @GetMapping("hentfilmer")
    public List<Film> films(){
    List<Film> filmList=new ArrayList<>();
    filmList.add(new Film(("Film-1")));
    filmList.add(new Film(("Film-2")));
    filmList.add(new Film(("Film-3")));
    filmList.add(new Film(("Film-4")));
    filmList.add(new Film(("Film-5")));
    return filmList;
    }
    @PostMapping("lagreBilett")
    public void leggTilBilett( Biletter newBilett){
        bilettList.add(newBilett);
    }
    @GetMapping("slettbilletter")
    public void slettbiletter(){
        bilettList.clear();
    }

}

