import react from "react";
import { Anchor } from 'antd';

import MessageForm from "./Components/MessageForm/MessageForm";

const App = () => {
  return (
    <div style={{ background: '#FFF6F6', width: '100%'}}>
      <div>
        <Anchor
          direction="horizontal"
          style={
              { 
                background: '#FAF3F0', 
                borderRadius: '3px',
                padding: '10px',
                borderBottomColor: 'black',
                borderBottomWidth: '2px'
              }
            }
          items={
            [
              {
                key: 'project-title',
                title: <h1 style={
                    {
                      fontSize: '24px', 
                      margin: 0,
                      fontWeight: 'normal' 
                    }
                  }
                >
                  Sentiment Analysis on Cryptocurrency Tweets
                </h1>,
              },
            ]
          }
        />
      </div>
      <div>
        <MessageForm />
      </div>
    </div>
  );
}

export default App;
