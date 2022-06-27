import { Button, List, Input } from "antd";
import { url } from "../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
const { Search } = Input;

function Home({ setCurrent, isAdmin }) {
  const [data, setData] = useState([]);
  useEffect(() => setCurrent("home"));
  useEffect(() => {
    async function get() {
      const res = await axios.get(url + "video", {
        params: {
          value: "",
          username: "",
        },
      });
      // console.log(res.data);
      setData(res.data);
    }
    get();
  }, []);

  const handleDelete = async (item) => {
    // console.log(item);
    await axios.delete(url + "video", {
      params: {
        id: item.id,
      },
    });
    //console.log(item);
    setData(data.filter((i) => i.id !== item.id));
  };

  const onSearch = async (value) => {
    console.log(value);
    const res = await axios.get(url + "video", {
      params: {
        value: value,
        username: "",
      },
    });
    setData(res.data);
  };
  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        style={{ marginTop: 20, width: 300 }}
      />

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <h5>{item.author}</h5>
            <List.Item.Meta
              title={
                <a href={item.link}>
                  <h2>{item.title}</h2>
                </a>
              }
              description={item.description}
            />
            {isAdmin ? (
              <Button type="danger" onClick={() => handleDelete(item)}>
                删除
              </Button>
            ) : null}
          </List.Item>
        )}
      />
    </>
  );
}

export default Home;
