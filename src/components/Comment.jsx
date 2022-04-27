

import React, { useEffect, useState } from 'react';

import { Modal,Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import { InboxOutlined, UpOutlined, DownOutlined, SearchOutlined, ClearOutlined, FileAddFilled,DeleteOutlined,DeleteFilled } from '@ant-design/icons';
//import articles from './data/articles.json'

import { formItem2Layout, emailRules, passwordRules, requireUploadFieldRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules, requireSelectFieldRules } from '../common/latoutAndRules'

import { HeartOutlined, HeartFilled,ExclamationCircleOutlined } from '@ant-design/icons';
import { uuid, toBase64, getAccessToken, getAvatar, getUserFullName,getDateTimeString } from '../common/utils';
import PropTypes from 'prop-types';
import * as http from '../common/http-common'

const { TextArea } = Input;
const { confirm } = Modal;


CommentObj.prototype = {
    dog: PropTypes.object.isRequired,
    navigate: PropTypes.object.isRequired
}

function CommentObj(props) {

    const dog = { ...props.dog }


    const [comments, setComments] = useState([])
    const [submitting, setSubmitting] = useState(false)

    const [form] = Form.useForm();



    useEffect(() => {
        if (dog.id) {

            loadComments()
        }

    }, [dog.id])


    const loadComments = async () => {
        const data = await http.get(props, `/comments/${dog.id}`, { needLoading: false })
   
        setComments(data)

    }

    const deleteComment = (e) =>{
        confirm({
            title: 'Are you sure delete this dog?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return handleDelete(e['data-id'])
            },
            onCancel() {
    
            },
        });
    }

    const handleDelete = (id) => {
        (async () => {
          try {
            
    
            const res = await http.del(props, `/comments/${id}`, { successMsg: "delete successfully" })
            loadComments()
          } catch (ex) {
    
            console.dir(ex)
          }
    
        })()
      }
    
  

    const renderActions = (props) => {
        if(!props['data-delete']){
            return []
        }
        return [
            <Tooltip  title="Delete">
              <span onClick={()=>deleteComment(props)}>
                <DeleteFilled />
                <span className="comment-action">Delete</span>
              </span>
            </Tooltip>,
          ]
    }
    
    const CommentList = ({ comments }) => {
        let mapDataSource = comments.map(o => {
            return {
                author: o.author,
                avatar: o.avatar,
                content: o.comment,
                datetime: getDateTimeString(o.commentDate),
                'data-id':o.id,
                'data-delete':o.canDelete

            }
        })
        return (
            <List
                dataSource={mapDataSource}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={props => <Comment actions={renderActions(props)} {...props} />}
            />
        )
    }



    const onFinish = (values) => {

        (async () => {
            try {
                setSubmitting(true)
                const { comment } = values
                console.log(comment)
                let data = {
                    dogId: dog.id,
                    comment: comment
                }

                const res = await http.post(props, "/comments", { param: data, needLoading: false })
                loadComments()
                setSubmitting(false)
            } catch (ex) {

                console.dir(ex)
                setSubmitting(false)
            }

        })()



    }

    

      

    return (

        <>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                
                avatar={<Avatar src={getAvatar()} alt={getUserFullName()} />}
                content={
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item name="comment">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} type="primary">
                                Add Comment
                            </Button>
                        </Form.Item>
                    </Form>
                }
            />
        </>

    )

}


export default CommentObj

