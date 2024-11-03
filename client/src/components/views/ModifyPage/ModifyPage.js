import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { modifyUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
    Form,
    Input,
    Button,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

// 회원정보 수정페이지
function ModifyPage(props) {
    console.log(props);
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                email: localStorage.getItem('email'),
                lastName: localStorage.getItem('lastName'),
                name : localStorage.getItem('name'),
                password: '',
                confirmPassword: ''
            }}

            validationSchema={Yup.object().shape({
            name: Yup.string()
                .required('이름은 필수입니다.'),
            lastName: Yup.string()
                .required('성은 필수 항목입니다.'),
            email: Yup.string()
                .email('이메일이 잘못되었습니다.')
                .required('이메일은 필수입니다.'),
            password: Yup.string()
                .min(6, '비밀번호는 6자 이상이어야 합니다.')
                .required('비밀번호가 필요합니다.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], '비밀번호는 일치해야 합니다.')
                .required('비밀번호 확인이 필요합니다.')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastName: values.lastName,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                    };

                // dispatch(modifyUser(dataToSubmit)).then(response => {
                //     if (response.payload.success) {
                //         props.history.push("/login");
                //     } else if (response.payload.err.code === 11000) {
                //         alert("이미 가입된 Email이 존재합니다.");
                //     } else {
                //         alert(response.payload.err.errmsg);
                //     }
                // })

                dispatch(modifyUser(dataToSubmit)).then(response => {
                    if (response.payload.success) {
                        console.log(dataToSubmit);
                        // props.history.push("/login");
                    } else if (response.payload.err.code === 11000) {
                        alert("이미 가입된 Email이 존재합니다.");
                    } else {
                        alert(response.payload.err.errmsg);
                    }
                })

                setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                
                return (
                    <div className="app">
                        <h2>회원정보 수정</h2>
                        <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                            <Form.Item required label="성">
                                <Input
                                    id="lastName"
                                    placeholder="성을 입력하세요."
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="input-feedback">{errors.lastName}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="이름">
                                <Input
                                    id="name"
                                    placeholder="이름을 입력해 주세요."
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                                <Input
                                    id="email"
                                    placeholder="Email을 입력해 주세요."
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                                <Input
                                    id="password"
                                    placeholder="Password를 입력해 주세요."
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Password 확인" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="비밀번호를 한번 더 입력해 주세요."
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    회원정보 수정
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            }}   
        </Formik>
    );
};

export default ModifyPage;