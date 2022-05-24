# 团队网站_ API 接口文档

## 1.1 API 接口说明

### 1.1.1 概述

+ 接口基准地址：`http://127.0.0.1:4000`

+ 服务端已开启 CORS 跨域支持

+ API 认证统一使用 Token 认证

+ 需要授权的 API，必须在请求头中使用 `authorization` 字段提供 `token` 令牌

+ 使用 HTTP Status Code 标识状态

+ 数据返回格式统一使用 JSON

  

### 1.1.2 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。

- POST（CREATE）：在服务器新建一个资源。

- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。

- DELETE（DELETE）：从服务器删除资源。

  

### 1.1.3 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |

## 1.2 登录

### 1.2.1 登录验证接口

- 请求路径：`/team/login`
- 请求方法：`post`
- 请求参数测试：`username=测试1235   password=12344`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 学号/手机号/邮箱   | 不能为空 |
| password | 密码     | 不能为空 |

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| token  | 用户身份校验 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjEzMjc2OTk3NzkyIiwicm9sZSI6IuWtpueUnyIsImlhdCI6MTY1MTE5ODEyMywiZXhwIjoxNjUxMjAxNzIzfQ.mT2fzBPEa_VhFlCsd1bMWtZTWQZMZ5m4uPJ1RBMHC3g"
}
```

## 1.3 注册

### 1.3.1 学生注册接口

- 请求路径：`/team/student/register`

- 请求方法：`post`

- **请求参数**

  | 参数名   | 参数说明 | 备注 |
  | -------- | -------- | ---- |
  | studentNo | 学号   |   不能为空   |
  | studentName | 姓名     |    不能为空  |
  | password | 密码   |    可为空(默认:123456)  |
  | telephone | 手机号     |    不能为空  |
  | sex | 性别   |   不能为空   |
  | introduction | 个人介绍     |   可为空   |
  | email | 邮箱   |   不能为空   |
  | idCard | 证件号     |   不能为空   |
  | classesId | 班级ID   |   不能为空   |
  | avatar | 头像     |   可为空   |
  | birth | 出生年月     |   不能为空   |
  | schoolOrWork | 目前所有学校/公司     |   可为空   |


- **响应数据**

```json
{
  "code": 200,
  "msg": "注册成功"
}
```

### 1.3.2 教师注册接口

- 请求路径：`/team/teacher/register`

- 请求方法：`post`

- **请求参数**

  | 参数名   | 参数说明 | 备注 |
  | -------- | -------- | ---- |
  | teacherName | 姓名   |   不能为空   |
  | teacherPhone | 手机号     |    不能为空  |
  | teacherEmail | 电子邮箱   |    不能为空  |
  | teacherAvatar | 头像     |    不能为空  |
  | teacherIntroduction | 介绍   |   不能为空   |
  | teacherPassword | 密码     |   不能为空   |


- **响应数据**

```json
{
  "code": 200,
  "msg": "注册成功"
}
```

## 1.4 用户信息

### 1.4.1 通过Id查询学生

- 请求路径：`/team/student/info`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| userId | 学生Id   | 没有填写userId时查询当前学生信息,填写的情况下查询对应学生信息(只能由教师权限调用) |

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| id  | 学生Id |  |
| studentName  | 学生姓名 |  |
| studentNo  | 学生学号 |  |
| sex  | 性别 |  |
| avatar  | 头像 |  |
| introduction  | 学生介绍 |  |
| createdTime  | 创建时间 |  |
| gradeLevel  | 年段 |  |
| className  | 班级 |  |
| telephone  | 手机号码 |  |
| email  | 电子邮箱 |  |
| birthTime  | 出生年月 |  |
| schoolOrWorkplace  | 目前学校/就业地点 |  |
| idCard  | 证件号 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": {
    "id": 2,
    "studentName": "江河",
    "studentNo": "205803335",
    "sex": 1,
    "avatar": "default_avatar.jpg",
    "introduction": "这个学长很不想介绍自己",
    "createdTime": "2022-04-29 20:28:07",
    "gradeLevel": "2020",
    "className": "计算机应用技术3班",
    "telephone": "132769942421",
    "email": "2228524333@qq.com",
    "birthTime": "2002-10-22",
    "schoolOrWorkplace": "船政学子",
    "idCard": "350292382673672"
  }
}
```

### 1.4.2 查询所有学生

- 请求路径：`/team/student/list`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| pageNum | 页码   |  不能为空|
| pageSize | 每页显示的数量   |  不能为空|

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| id  | 学生Id |  |
| studentName  | 学生姓名 |  |
| studentNo  | 学生学号 |  |
| sex  | 性别 |  |
| gradeLevel  | 年段 |  |
| className  | 班级 |  |
| introduction  | 个人介绍 |  |
| avatar  | 头像 |  |
| createdTime  | 创建时间 |  |

**响应数据**

```json
{
  "code": "查询成功",
  "msg": 200,
  "data": [
    {
      "id": 1,
      "studentName": "范礼江",
      "studentNo": "205803330",
      "sex": 1,
      "gradeLevel": "2020",
      "className": "计算机应用技术3班",
      "introduction": "喜欢玩前端",
      "avatar": "default_avatar.jpg",
      "createdTime": "2022-04-29 19:59:24"
    },
    {
      "id": 2,
      "studentName": "江河",
      "studentNo": "205803335",
      "sex": 1,
      "gradeLevel": "2020",
      "className": "计算机应用技术3班",
      "introduction": "这个学长很不想介绍自己",
      "avatar": "default_avatar.jpg",
      "createdTime": "2022-04-29 20:28:07"
    }
  ]
}
```
### 1.4.3 修改学生信息

- 请求路径：`/team/student/put`
- 请求方法：`put`

**请求参数**

第一种情况  学生权限

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| telephone | 手机号   |  不能为空|
| email | 邮箱   |  不能为空|
| avatar | 头像   |  可为空|
| introduction | 个人介绍   |  不能为空|
| isHidden | 是否隐藏信息   |  不能为空|
| schoolOrWork | 学校/就职地   |  不能为空|

第二种情况 教师权限

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| studentId | 学生Id   |  不能为空|
| studentNo | 学生学号   |  不能为空|
| studentName | 学生名字   |  不能为空|
| telephone | 手机号   |  不能为空|
| sex | 性别   |  不能为空|
| avatar | 头像   |  可为空|
| email | 电子邮箱   |  不能为空|
| idCard | 证件号   |  不能为空|
| classesId | 班级Id   |  不能为空|
| introduction | 个人介绍   |  不能为空|
| isHidden | 是否隐藏信息   |  不能为空|
| birth | 出生年月   |  不能为空|
| schoolOrWork | 学校/就职地   |  不能为空|


**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 1.4.4 修改教师信息

- 请求路径：`/team/teacher/put`
- 请求方法：`put`

**请求参数**


| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| teacherName | 姓名   |  不能为空|
| teacherPhone | 手机号   |  不能为空|
| avatar | 头像   |  可为空|
| teacherEmail | 电子邮箱   |  不能为空|
| teacherSex | 性别   |  不能为空|
| teacherIntroduction | 个人介绍   |  不能为空|


**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 1.4.5 修改密码

- 请求路径：`/team/reset/pwd`
- 请求方法：`put`

**请求参数**


| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| oldPassword | 旧密码   |  不能为空|
| newPassword | 新密码   |  不能为空|



**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "修改成功"
}
```


### 1.4.6 注销学生账号

- 请求路径：`/team/student/del`
- 请求方法：`delete`

**请求参数**


| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| userId | 用户Id   |  不能为空|



**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```


### 1.4.6 注销教师账号

- 请求路径：`/team/teacher/del`
- 请求方法：`delete`

**请求参数**

只能由教师账号删除

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| userId | 用户Id   |  不能为空|



**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```
## 1.5 新闻

### 1.5.1 添加新闻

- 请求路径：`/team/news/submit`
- 请求方法：`post`
- 只能由教师权限调用

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| newsTitle | 新闻标题   | 只能由教师权限调用 |
| newsContent | 新闻内容   | 只能由教师权限调用 |
| isSticky | 是否置顶   | T/F |
| img | 新闻图片   | 最少1张,最多5张 |

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "发布成功"
}
```

### 1.5.2 修改新闻

- 请求路径：`/team/news/put`
- 请求方法：`put`
- 只能由教师权限调用

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| newsTitle | 新闻标题   | 只能由教师权限调用 |
| newsContent | 新闻内容   | 只能由教师权限调用 |
| isSticky | 是否置顶   | T/F |
| img | 新闻图片   | 最少1张,最多5张 |

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 1.5.3 删除新闻

- 请求路径：`/team/news/del`
- 请求方法：`put`
- 携带参数:`newId=1`
- 只能由教师权限调用

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| newId | 新闻ID   | 只能由教师权限调用 |

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 1.5.4 查询所有新闻

- 请求路径：`/team/news/list`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| pageNum | 页码   |  不能为空|
| pageSize | 每页显示的数量   |  不能为空|

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": "查询成功",
  "msg": 200,
  "data": [
    {
      "id": 1,
      "newTitle": "巴拉巴拉",
      "newContent": "阿巴阿巴阿巴阿巴阿巴阿巴",
      "newImg": "img-1651390337667-93673142.jpg,img-1651390337667-162031802.jpg,img-1651390337668-680516668.jpg,",
      "CreatedTime": "2022-05-01T04:16:26.000Z",
      "postedById": 1,
      "newsViews": 0,
      "isSticky": "F"
    }
  ]
}
```

### 1.5.5 添加浏览记录

- 请求路径：`/team/news/views`
- 请求方法：`put`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| newsId | 新闻ID   |  不能为空|

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

## 1.6 轮播图
### 1.6.1 添加轮播图

- 请求路径：`/team/banner/submit`
- 请求方法：`post`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| bannerTitle | 轮播图标题   |  不能为空|
| bannerImg | 轮播图图片   |  |
| newsId | 新闻ID   |  不能为空|

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 1.6.2 修改轮播图

- 请求路径：`/team/banner/submit`
- 请求方法：`put`

**请求参数**

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| id | 轮播图Id   |  不能为空|
| bannerTitle | 轮播图标题   |  不能为空|
| bannerImg | 轮播图图片   |  不能为空|
| newsId | 新闻ID   |  不能为空|

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 1.6.3 查询轮播图

- 请求路径：`/team/banner/list`
- 请求方法：`get`

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "id": 1,
      "banner_title": "秀海哈哈",
      "banner_img": "图拍你地址",
      "created_time": "2022-05-01T09:50:34.000Z",
      "news_id": 1
    }
  ]
}
```

### 1.6.3 查询轮播图

- 请求路径：`/team/banner/del`
- 请求方法：`delete`

**请求参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| bannerId  | 轮播图Id |  |

**响应参数**

| 参数名 | 参数说明     | 备注        |
| ------ | ------------ | ----------- |
| code  | 状态码 |  |
| msg  | 状态信息 |  |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

## 1.7 赛项

### 1.7.1 添加赛项

- 请求路径：`/team/tournaments/submit`
- 请求方法：`post`

**请求参数**

| 参数名          | 参数说明 | 备注 |
| --------------- | -------- | ---- |
| tournamentsName | 赛项名称 |      |
| tournamentsLevel | 赛项级别 |      |
| tournamentsType | 赛项类型 |      |
| tournamentsIntroduction | 赛项介绍 |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "添加成功"
}
```



### 1.7.2 修改赛项

- 请求路径：`/team/tournaments/put`
- 请求方法：`put`

**请求参数**

| 参数名          | 参数说明 | 备注 |
| --------------- | -------- | ---- |
| id | 赛项Id |      |
| tournamentsName | 赛项名称 |      |
| tournamentsLevel | 赛项级别 |      |
| tournamentsType | 赛项类型 |      |
| tournamentsIntroduction | 赛项介绍 |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "修改成功"
}
```





### 1.7.3 获得赛项

- 请求路径：`/team/tournaments/list`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| pageNum | 页码 |      |
| pageSize | 每页显示的数量 |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| tournamentsName    | 赛项名称 |      |
| tournamentsLevel    | 赛项级别 |      |
| tournamentsType    | 赛项类型 |      |
| tournamentsIntroduction    | 赛项简介 |      |

**响应数据**

```json
{
  "code": "查询成功",
  "msg": 200,
  "data": [
    {
      "id": 1,
      "tournamentsName": "不知道还有这个比赛",
      "tournamentsLevel": "国家级",
      "tournamentsType": "团队赛",
      "tournamentsIntroduction": "这个比赛一看就很好玩"
    },
    {
      "id": 2,
      "tournamentsName": "移动开发赛项",
      "tournamentsLevel": "省级",
      "tournamentsType": "个人赛",
      "tournamentsIntroduction": "该比赛对接国赛"
    }
  ]
}
```

### 1.7.4 删除赛项

- 请求路径：`/team/tournaments/del`
- 请求方法：`delete`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| tournamentsId | 赛项Id |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```



## 1.8 荣誉

### 1.8.1 添加赛项

- 请求路径：`/team/honors/submit`
- 请求方法：`post`

**请求参数**

| 参数名          | 参数说明 | 备注 |
| --------------- | -------- | ---- |
| tournamentsId | 赛项Id |      |
| honorsAchievement | 比赛成绩 |      |
| acquisitionTime | 获得时间 |      |
| participationId | 参与者Id |      |
| instructorName | 指导教师 |      |
| honorsImg | 图片 | 最少一张最多五张     |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "添加成功"
}
```



### 1.8.2 修改赛项

- 请求路径：`/team/honors/put`
- 请求方法：`put`

**请求参数**

| 参数名          | 参数说明 | 备注 |
| --------------- | -------- | ---- |
| honorsId | 荣誉Id |      |
| tournamentsId | 赛项Id |      |
| honorsAchievement | 比赛成绩 |      |
| acquisitionTime | 获得时间 |      |
| participationId | 参与者Id |      |
| instructorName | 指导教师 |      |
| honorsImg | 图片 | 最少一张最多五张     |
| releaseId | 发布者ID(教师Id) |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "修改成功"
}
```


### 1.8.3 删除赛项

- 请求路径：`/team/honors/del`
- 请求方法：`delete`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| honorsId | 荣誉Id |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```


### 1.8.4 获得全部荣誉

- 请求路径：`/team/honors/list`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| pageNum | 页码 |      |
| pageSize | 每页显示的数量 |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| tournamentsId    | 赛项id |      |
| honorsAchievement    | 比赛成绩 |      |
| honorsImgs    | 比赛照片 |      |
| acquisitionTime    | 获得时间 |      |
| releaseTime    | 发布时间 |      |
| releaseId    | 发布者Id |      |
| participationId    | 参与者 |      |
| instructorName    | 指导教师 |      |

**响应数据**

```json
{
  "code": "查询成功",
  "msg": 200,
  "data": [
    {
      "id": 1,
      "tournamentsId": 1,
      "honorsAchievement": "移动键是",
      "honorsImgs": "honorsImg-1651409686331-423234841.jpg,honorsImg-1651409686331-74453384.jpg,",
      "acquisitionTime": "2022-05-06",
      "releaseTime": "2022-05-01 20:54:46",
      "releaseId": 1,
      "participationId": 1,
      "instructorName": "安师"
    }
  ]
}
```

### 1.8.5 获得学生荣誉

- 请求路径：`/team/honors/list/by`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| participationId | 参与者Id |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| tournamentsId    | 赛项id |      |
| honorsAchievement    | 比赛成绩 |      |
| honorsImgs    | 比赛照片 |      |
| acquisitionTime    | 获得时间 |      |
| releaseTime    | 发布时间 |      |
| releaseId    | 发布者Id |      |
| participationId    | 参与者 |      |
| instructorName    | 指导教师 |      |

**响应数据**

```json
{
  "code": "查询成功",
  "msg": 200,
  "data": [
    {
      "id": 1,
      "tournamentsId": 1,
      "honorsAchievement": "移动键是",
      "honorsImgs": "honorsImg-1651409686331-423234841.jpg,honorsImg-1651409686331-74453384.jpg,",
      "acquisitionTime": "2022-05-06",
      "releaseTime": "2022-05-01 20:54:46",
      "releaseId": 1,
      "participationId": 1,
      "instructorName": "安师"
    }
  ]
}
```


## 1.9 报名表

### 1.9.1 添加报名表

- 请求路径：`/team/registration/submit`
- 请求方法：`post`

**请求参数**

| 参数名          | 参数说明 | 备注 |
| --------------- | -------- | ---- |
| classId | 班级Id |      |
| studentNo | 学号 |      |
| studentName | 姓名 |      |
| direction | 兴趣方向 |      |
| introduction | 个人介绍 |      |
| sex | 图片 | 性别     |
| email | 图片 | 邮箱     |
| phone | 图片 | 电话     |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "添加成功"
}
```



### 1.8.2 审批报名表

- 请求路径：`/team/registration/put`
- 请求方法：`put`

**请求参数**

| 参数名          | 参数说明 | 备注 |
| --------------- | -------- | ---- |
| registrationId   | 报名表Id |      |
| isItPassed | 赛项Id |      |


**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "审批成功"
}
```


### 1.8.3 删除报名表

- 请求路径：`/team/registration/del`
- 请求方法：`delete`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| registrationId | 报名表Id |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 状态信息 |      |

**响应数据**

```json
{
  "code": 200,
  "msg": "删除成功"
}
```


### 1.8.4 获得全部报名表

- 请求路径：`/team/registration/`
- 请求方法：`get`

**请求参数**

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| pageNum | 页码 |      |
| pageSize | 每页显示的数量 |      |

**响应参数**

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id    | id |      |
| classId    | 班级Id |      |
| studentNo    | 学号 |      |
| studentName    | 姓名 |      |
| direction    | 兴趣方向 |      |
| introduction    |  |      |
| sex    | 性别 |      |
| email    | 邮箱 |      |
| phone    | 电话 |      |
| registrationTime    | 添加时间 |      |
| isItPassed    | 是否通过 |      |
| teacherId    | 审批教师 |      |

**响应数据**

```json
{
  "code": "查询成功",
  "msg": 200,
  "data": [
    {
      "id": 1,
      "classId": 1,
      "studentNo": "205803335",
      "studentName": "范礼江",
      "direction": "Android",
      "introduction": "好哈哈哈哈哈哈哈哈",
      "sex": "1",
      "email": "2928527233@qq.com",
      "phone": "13276997992",
      "registrationTime": "2022-05-02 19:39:21",
      "isItPassed": "T",
      "teacherId": 2
    }
  ]
}
```