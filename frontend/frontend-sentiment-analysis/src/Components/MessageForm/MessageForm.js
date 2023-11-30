import react from "react";
import axios from 'axios';
import { useState } from "react";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";

import "./MessageForm.css";

const MessageForm = () => {

    const [message, setMessage] = useState();
    const [output, setOutput] = useState();

    const callBackend = async() => {
        const res = await axios.get("http://127.0.0.1:5000/predict", {headers: {
            'statement': message
        }})
        if (res) {
            setOutput(res.data.output);
        }
    }
    

    return (
        <div className="input-form">
            <h1 className="description-ac">Sentiment Analysis of Crypto Tweets</h1>
            <p className="description-ac">Please Enter the tweet for which the sentiment is to be analyzed.</p>
            <Form 
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="tweet"
                    name="tweet"
                    rules = {[{required: true, message:'Please enter the tweet for which the sentiment is to be analyzed!'}]}
                >
                    <Input placeholder="Tweet" onChange={e => setMessage(e.target.value)}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={(event) => {
                        event.preventDefault()
                        callBackend()
                    }}>
                        Calculate
                    </Button>
                </Form.Item>
            </Form>
            {output?<p className="output">The overall sentiment of the tweet is <b>{output}</b></p>:<></>}
        </div>
    );
}

export default MessageForm;