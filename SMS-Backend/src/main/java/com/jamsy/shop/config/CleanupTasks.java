package com.jamsy.shop.config;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.sql.init.dependency.DependsOnDatabaseInitialization;
import org.springframework.stereotype.Component;

@Component
@DependsOnDatabaseInitialization
public class CleanupTasks {

    @Autowired
    private HikariDataSource dataSource;

    @PreDestroy
    public void cleanup() {
        if (dataSource != null) {
            dataSource.close();
        }
    }
}
