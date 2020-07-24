import './App.css';
import React from 'react';
import { Card, Row, Col, Button, List, Input } from "antd";
import ReactAudioPlayer from 'react-audio-player';
import {SERVER_URL} from './servicesURLs'

const Queries = require('./Queries')
const { TextArea } = Input;

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      comments: [],
      isLoading: false
    };

  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };


  async setComment(value) {
    this.setState({isLoading:true})
    let id = await Queries.setComment(value);
    Queries.synthesize(id, value).then(() => {
      window.location.reload(false);
      this.setState({isLoading: false})
    })
    this.setState({ value: '' });

  }

  async getComments() {
    this.setState({isLoading:true})
    let response = await Queries.getComments();
    this.setState({ comments: response })
    this.setState({isLoading: false})

  }

  componentDidMount() {
    this.getComments();
  }

  render() {
    return (
      <div>
        <Row style={{ margin: '5%' }} gutter={[16, 24]}>
          <Col md={{ span: 24}} lg={{ span: 12}} style={{ paddingLeft: '2vw', paddingRight: '2vw' }} className={'comentario'}>
            <Card title={'Comentário'}>
              <Row>
                <TextArea
                  value={this.state.value}
                  onChange={this.onChange}
                  autoSize={{ minRows: 10, maxRows: 10 }}
                  maxLength={500}
                />
              </Row>
              <Row style={{ paddingTop: '2vh'}}>
                <Button type="primary" onClick={() => this.setComment(this.state.value)}>Cadastrar</Button>
              </Row>
            </Card>
          </Col>
          <Col md={{ span: 24}} lg={{ span: 12}} style={{ paddingLeft: '2vw', paddingRight: '2vw' }} className={'comentarios'}>
            <Card title={'Comentários'}>
              <List
                itemLayout="vertical"
                size="large"
                loading={this.state.isLoading}
                dataSource={this.state.comments}
                renderItem={item =>
                  <List.Item>
                    <Row gutter={[16, 24]} >
                      <Col span={24} style={{ paddingTop: '2vh', paddingBottom: '2vh' }}>
                        {item.comentario}
                      </Col>
                      <Col span={24}>
                        <ReactAudioPlayer
                          src={`${SERVER_URL}/audio/${item.id}.wav`}
                          controls
                          style={{ width: '35vw', height: '3vh' }}
                        />
                      </Col>
                    </Row>
                  </List.Item>
                }
              />
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

export default (App);
