package com.example.demo;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.dao.UserDao;
import com.example.demo.mapper.ContributeMapper;
import com.example.demo.mapper.InformationMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.mapper.VideoMapper;
import com.example.demo.model.Contribute;
import com.example.demo.model.Information;
import com.example.demo.model.User;
import com.example.demo.model.Video;
import com.example.demo.utils.Response;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
@MapperScan("com/example/demo/mapper")
public class

DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }


    @Resource
    private UserMapper userMapper;

    @GetMapping("/user")
    public Response loginUser(String username, String password) {
        List<User> userList = UserDao.queryByUsername(userMapper, username);
        if (userList.isEmpty()) {
            return new Response(true, "用户名不存在");
        }
        User user = userList.get(0);
        if (!user.getPassword().equals(password)) {
            return new Response(true, "用户名或密码错误");
        }
        String token;
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            token = JWT.create()
                    .withClaim("username", username)
                    .withClaim("password", password)
                    .withClaim("isAdmin", user.isAdmin())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            System.out.print("123");
            return null;
            //Invalid Signing configuration / Couldn't convert Claims.
        }
        return new Response(false, token);
    }

    @PostMapping("/user")
    public String registerUser(@RequestBody Map<String, Object> params) {
        String username = params.get("username").toString();
        String password = params.get("password").toString();
        List<User> userList = UserDao.queryByUsername(userMapper, username);
        if (userList.isEmpty()) {
            userMapper.insert(new User(username, password));
            return null;
        }
        return "用户名已存在";
    }

    @Resource
    private ContributeMapper contributeMapper;
    @GetMapping("/contribute")
    public List<Contribute> getContribute() {
        return contributeMapper.selectList(null);
    }

    @PostMapping("/contribute")
    public void postContribute(@RequestBody Map<String, Object> params) {
        String title = params.get("title").toString();
        String link = params.get("link").toString();
        String description = params.get("description").toString();
        String author = params.get("author").toString();

        //return new Video(title, link, description, author);
        contributeMapper.insert(new Contribute(title, link, description, author));
    }

    @DeleteMapping("/contribute")
    public void deleteContribute(String id) {
        QueryWrapper<Contribute> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        contributeMapper.delete(queryWrapper);
    }

    @Resource
    private VideoMapper videoMapper;

    @GetMapping("/video")
    public List<Video> getVideo(String value, String username) {
        QueryWrapper<Video> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");
            queryWrapper.like("title", value);
        if (!username.equals("")) {
            queryWrapper.eq("author", username);
        }

        return videoMapper.selectList(queryWrapper);
    }

    @PostMapping("/video")
    public void postVideo(@RequestBody Map<String, Object> params) {
        String title = params.get("title").toString();
        String link = params.get("link").toString();
        String description = params.get("description").toString();
        String author = params.get("author").toString();

        //return new Video(title, link, description, author);
        videoMapper.insert(new Video(title, link, description, author));
    }

    @PutMapping("/video")
    public void putVideo(@RequestBody Map<String, Object> params) {
        String id = params.get("id").toString();
        String title = params.get("title").toString();
        String link = params.get("link").toString();
        String description = params.get("description").toString();
        String author = params.get("author").toString();


        videoMapper.updateById(new Video(Integer.parseInt(id), title, link, description, author));

    }
    @DeleteMapping("/video")
    public void deleteVideo(String id) {
        QueryWrapper<Video> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        videoMapper.delete(queryWrapper);
    }


    @Resource
    private InformationMapper informationMapper;
    @GetMapping("/information")
    public List<Information> getInformation(String username) {
        QueryWrapper<Information> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");
        queryWrapper.eq("username", username);
        return informationMapper.selectList(queryWrapper);
    }

    @PostMapping("/information")
    public void postInformation(@RequestBody Map<String, Object> params) {
        String username = params.get("username").toString();
        String message = params.get("message").toString();

        informationMapper.insert(new Information(username, message));
    }

    @DeleteMapping("/information")
    public void deleteInformation(String id) {
        QueryWrapper<Information> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        informationMapper.delete(queryWrapper);
    }
}
