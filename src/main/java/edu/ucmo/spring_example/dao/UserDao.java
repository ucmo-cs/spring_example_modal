package edu.ucmo.spring_example.dao;

import edu.ucmo.spring_example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUserName(String userName);
}