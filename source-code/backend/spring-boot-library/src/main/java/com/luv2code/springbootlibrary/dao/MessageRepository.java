package com.luv2code.springbootlibrary.dao;

import com.luv2code.springbootlibrary.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);

    // To all users who currently have an open ticket or message to our admin.
    Page<Message> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);

}
