package com.luv2code.springbootlibrary.dao;

import com.luv2code.springbootlibrary.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

//extend the book repository to our JPA repository.
public interface BookRepository extends JpaRepository<Book, Long> {
    //implement new API - Search by books title
    //test API http://localhost:8080/api/books/search/findByTitleContaining?title=guru&page=0&size=5
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);

    // advanced SQL command
    @Query("select o from Book o where id in :book_ids")
    List<Book> findBooksByBookIds (@Param("book_ids") List<Long> bookId);

}
