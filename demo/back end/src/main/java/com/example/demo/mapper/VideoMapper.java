package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.model.Information;
import com.example.demo.model.User;
import com.example.demo.model.Video;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoMapper extends BaseMapper<Video> {
}
