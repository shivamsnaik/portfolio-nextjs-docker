
import { useState, useEffect } from "react"
import { PromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

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

    useEffect(() => {}, [messages])

    return (
        <div
            id="chatbot-window"
            style={{
                display: "flex",
                flexDirection: "column-reverse",
                padding: `
                ${props.paddingTop}px
                ${props.paddingRight}px 
                ${props.paddingBottom}px 
                ${props.paddingLeft}px`,
                backgroundColor: `${props.backgroundColor}`,
                width: `100%`,
                height: "100%",
                borderRadius: `${props.radius}px`,
            }}
        >
            <div
                id="contents"
                style={{
                    height: "100%",
                    flex: 1,
                    padding: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: `${props.radius}px`,
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        padding: "10px",
                        gap: "20px",
                        width: "100%",
                    }}
                >
                    <button
                        id="mean-gpt"
                        style={{
                            borderRadius: `${props.radius}px`,
                            fontSize: `${props.fontSize}px`,
                            ...buttonStyle,
                        }}
                    >
                        MeanGPT
                    </button>
                    <button
                        id="job-search-gpt"
                        style={{
                            borderRadius: `${props.radius}px`,
                            fontSize: `${props.fontSize}px`,
                            ...buttonStyle,
                        }}
                    >
                        Job Search GPT
                    </button>
                </div>
                <div
                    id="chat-bubbles"
                    style={{
                        width: "100%",
                        overflowY: "scroll",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column-reverse",
                        margin: "0px",
                        padding: "10px",
                        backgroundColor: `white`,
                        border: `3px solid ${props.backgroundColor}`,
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
                    style={{
                        flex: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: "4px 0px 0px 0px",
                        padding: "5px",
                        backgroundColor: `${props.backgroundColor}`,
                        borderRadius: `${props.radius}px`,
                    }}
                >
                    <form
                        onSubmit={getResponseToQuestion}
                        style={{ flex: 1, display: "flex" }}
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
                                flex: 0,
                                borderRadius: `${props.radius}px`,
                                fontSize: `${props.fontSize}px`,
                                ...buttonStyle,
                            }}
                            className="btn3"
                            type="submit"
                        >
                            Enter
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

const buttonStyle = {
    fontFamily: "urbanist",
    padding: "5px",
    border: "5px solid transparent",
}

export default Chatbot;