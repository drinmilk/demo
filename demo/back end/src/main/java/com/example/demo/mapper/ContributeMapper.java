package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.model.Contribute;
import com.example.demo.model.User;
import com.example.demo.model.Video;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributeMapper extends BaseMapper<Contribute> {
}
