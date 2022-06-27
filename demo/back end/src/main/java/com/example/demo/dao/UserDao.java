package com.example.demo.dao;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;
@MapperScan("com/example/demo/mapper")
public class UserDao {
    public static List<User> queryByUsername(UserMapper userMapper, String username) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        return userMapper.selectList(queryWrapper);
    }
}
