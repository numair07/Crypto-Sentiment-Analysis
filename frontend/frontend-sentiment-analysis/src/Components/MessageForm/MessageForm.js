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
            <p className="description">Please enter the tweet for which the sentiment is to be analyzed.</p>
            <Form 
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
            >
                <Form.Item 
                    label="Tweet"
                    name="Tweet"
                    rules = {
                        [
                            {
                                required: true, 
                                message:'Please enter the tweet for which the sentiment is to be analyzed!'
                            }
                        ]
                    }
                    style={
                        { 
                            width: '80%'
                        }
                    }
                >
                    <Input.TextArea style={
                            { 
                                width: '80%',
                                height: '150px'
                            }
                        } 
                        allowClear
                        showCount 
                        placeholder="Tweet to be analyzed." 
                        onChange={
                            e => setMessage(e.target.value)
                        }

                    />
                </Form.Item>

                <Form.Item 
                    wrapperCol={
                        { 
                            offset: 8, 
                            span: 16 
                        }
                    }
                >
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        onClick={(event) => {
                            event.preventDefault()
                            callBackend()
                        }}
                        size="large"
                    >
                        Calculate
                    </Button>
                </Form.Item>
            </Form>
            {/* {output?<p className="output">The overall sentiment of the tweet is <b>{output}</b></p>:<></>} */}
            {
                output !== undefined ? (
                    <p className="output" style={
                            { 
                                backgroundColor: output === '0' ? '#FF6969' : output === '1' ? '#FFF5C2' : '#C7DCA7',
                                padding: '10px',
                                color: 'white',
                                width: '50%',
                                borderRadius: '5px'
                            }
                        }
                    > 
                        <b style={
                                { 
                                    color: output === '0' ? 'white' : output === '1' ? '#45474B' : '#45474B',
                                    padding: '5px',
                                }
                            }
                        >
                        The overall sentiment of the tweet is
                            {
                                output === '0' ? " negative." : output === '1' ? " neutral." : " positive."
                            }
                        </b>
                    </p>        
                ) : (
                    <></>
                )
}
        </div>
    );
}

export default MessageForm;