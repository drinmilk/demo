package com.example.demo;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.mapper.VideoMapper;
import com.example.demo.model.User;
import com.example.demo.model.Video;
import org.json.JSONArray;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.management.Query;
import java.sql.Wrapper;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class SampleTest {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private VideoMapper videoMapper;
    @Test
    public void testSelect() throws JSONException {
        List<Video> videoList = videoMapper.selectList(null);
        JSONArray jsonArray = new JSONArray(videoList);
        System.out.println(Arrays.toString(videoList.toArray(new Video[0])));
        System.out.println(jsonArray);

    }


}