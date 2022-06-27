import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import axios from "axios";
import { url } from "../config";
function Information({ setCurrent, username }) {
  const [data, setData] = useState([]);
  useEffect(() => setCurrent("information"));
  useEffect(() => {
    async function get() {
      const res = await axios.get(url + "information", {
        params: {
          username: username,
        },
      });
      console.log(res.data);
      setData(res.data);
    }
    get();
  }, []);

  const handleDelete = async (item) => {
    //console.log(item);
    await axios.delete(url + "information", {
      params: {
        id: item.id,
      },
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
          <h3>{item.message}</h3>
          <Button type="danger" onClick={() => handleDelete(item)}>
            删除
          </Button>
        </List.Item>
      )}
    />
  );
}

export default Information;
