
import { useState, useEffect } from "react"
import { PromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import styles from "../styles/Chatbot.module.scss";
import window_color from "../constants/global_style";

const Chatbot = (props) => {
    const [messages, appendMessages] = useState([])
    const [question, setQuestion] = useState("")

    const model = new ChatOpenAI({
        temperature: 0.9,
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY 
      });

    const promptTemplate = PromptTemplate.fromTemplate(
        "Give a mean answer to: {query}"
    )
    const chain = promptTemplate.pipe(model)

    const getResponseToQuestion = async (e) => {
        try {
            e.preventDefault()
            if (question.trim().length !== 0) {
                appendMessages((messages) => [
                    { isQuestion: true, text: question },
                    ...messages,
                ])
                //Erase question from input field in UI
                setQuestion("")
                const response = await chain.invoke({ query: question })
                console.log("Response: ", response)
                appendMessages((messages) => [
                    { isQuestion: false, text: response.content },
                    ...messages,
                ])
            }
        } catch (error) {
            console.log(error)
            appendMessages((messages) => [
                {
                    isQuestion: false,
                    text: "Lower your tone!!",
                },
                ...messages,
            ])
        }
    }

    /*
    STYLE OBJECTS
    */

    const chatWindowStyle = {
        backgroundColor: window_color,
        borderRadius: `${props.radius}px`
    }

    useEffect(() => {}, [messages])

    return (
        <div
            id="chatbot-window"
            className={styles.chatbotWindow}
            style={chatWindowStyle}
        >
            <div id="chatbot-types" className={styles.chatbotTypes} style={{borderRadius: `${props.radius}px`}}
                >
                    <button
                        id="mean-gpt"
                        className={styles.btn}
                        style={{
                            borderRadius: `${props.radius}px`,
                            fontSize: `${props.fontSize}px`,
                        }}
                    >
                        MeanGPT
                    </button>
                    <button
                        id="job-search-gpt"
                        className={styles.btn}
                        style={{
                            borderRadius: `${props.radius}px`,
                            fontSize: `${props.fontSize}px`,
                        }}
                    >
                        Job Search GPT
                    </button>
            </div>
            <div
                id="chatbot-contents"
                className={styles.chatbotContents}
                style={{borderRadius: `${props.radius}px`,}}
            >
                <div
                    id="chat-bubbles"
                    className={styles.chatBubbles}
                    style={{
                        borderRadius: `${props.radius}px`,
                    }}
                >
                    {messages.map((message) =>
                        !message["isQuestion"] ? (
                            // Answer
                            <div
                                id="chat-bubble"
                                style={{
                                    maxWidth: `${props.bubbleMaxWidth}px`,
                                    marginRight: "auto",
                                    backgroundColor: "#c393e6",
                                    padding: "10px",
                                    marginTop: "10px",
                                    borderRadius: `${props.radius}px`,
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: `${props.fontSize}px`,
                                        textAlign: "justify",
                                        textJustify: "inter-word",
                                        overflowWrap: "break-word",
                                        color: "white",
                                        fontFamily: "urbanist",
                                        margin: "0px",
                                    }}
                                >
                                    {message["text"]}
                                </p>
                            </div>
                        ) : (
                            // Question
                            <div
                                id="chat-bubble"
                                style={{
                                    maxWidth: `${props.bubbleMaxWidth}px`,
                                    marginLeft: "auto",
                                    background: "#57a5de",
                                    padding: "10px",
                                    marginTop: "10px",
                                    borderRadius: `${props.radius}px`,
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: `${props.fontSize}px`,
                                        color: "white",
                                        fontFamily: "urbanist",
                                        margin: "0px",
                                    }}
                                >
                                    {message["text"]}
                                </p>
                            </div>
                        )
                    )}
                </div>
                <div
                    id="input-section"
                    className={styles.chatInputs}
                    style={{
                        borderRadius: `${props.radius}px`,
                    }}
                >
                    <form
                        className={styles.chatForm}
                        onSubmit={getResponseToQuestion}
                        style={{ flex: 1, display: "flex", height: "50px" }}
                    >
                        <input
                            style={{
                                height: "100%",
                                overflowWrap: "break-word",
                                flex: 1,
                                marginRight: "5px",
                                border: "0px",
                                padding: "5px",
                                fontSize: `${props.fontSize}px`,
                                fontFamily: "urbanist",
                                borderRadius: `${props.radius}px`,
                            }}
                            placeholder={props.text}
                            value={question}
                            onChange={(e) => {
                                setQuestion(e.target.value)
                            }}
                        />
                        <button
                            style={{
                                borderRadius: `${props.radius}px`,
                                fontSize: `${props.fontSize}px`,
                            }}
                            className={styles.submitBtn}
                            type="submit"
                        >
                            <svg width="25px" height="25px" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.143 2.153a1 1 0 011.715 0l3.999 6.665a1 1 0 01-.858 1.515H2.001a1 1 0 01-.858-1.515l4-6.665z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style

Chatbot.displayName = "Chatbot Window"

export default Chatbot;