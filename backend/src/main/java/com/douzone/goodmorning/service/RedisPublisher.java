package com.douzone.goodmorning.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.douzone.goodmorning.exception.GlobalExceptionHandler;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

//    public void publish(ChannelTopic topic, ChatMessage message) {
//        redisTemplate.convertAndSend(topic.getTopic(), message);
//    }
    
    // 2번. 서버 => 레디스로 전달
    public void publish(String topic, ChatVo chatVo) {
    	log.info("2번 서버에서 레디스로 전달" + topic + "@" + chatVo);
        redisTemplate.convertAndSend(topic, chatVo);
    }
}
