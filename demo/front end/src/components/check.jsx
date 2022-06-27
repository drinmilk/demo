import { List, Button } from "antd";
import { url } from "../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
function Check({ setCurrent }) {
  const [data, setData] = useState([]);
  useEffect(() => setCurrent("check"));
  useEffect(() => {
    async function get() {
      const res = await axios.get(url + "contribute");
      // console.log(res.data);
      setData(res.data);
    }
    get();
  }, []);

  const handlePass = async (item) => {
    console.log(item);
    await axios.delete(url + "contribute", {
      params: {
        id: item.id,
      },
    });
    await axios.post(url + "video", item);
    await axios.post(url + "information", {
      username: item.author,
      message: `投稿的"${item.title}"已通过审核。`,
    });
    setData(data.filter((i) => i.id !== item.id));
  };
  const handleFail = async (item) => {
    console.log(item);
    await axios.delete(url + "contribute", {
      params: {
        id: item.id,
      },
    });
    await axios.post(url + "information", {
      username: item.author,
      message: `投稿的"${item.title}"未通过审核。`,
    });
    setData(data.filter((i) => i.id !== item.id));
  };
  return (
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
        <List.Item key={item.id}>
          <h5>{item.author}</h5>
          <List.Item.Meta
            title={
              <a href={item.link}>
                <h2>{item.title}</h2>
              </a>
            }
            description={item.description}
          />
          <Button
            onClick={() => handlePass(item)}
            type="primary"
            style={{ marginRight: 10 }}
          >
            通过
          </Button>
          <Button onClick={() => handleFail(item)}>不通过</Button>
        </List.Item>
      )}
    />
  );
}

export default Check;
