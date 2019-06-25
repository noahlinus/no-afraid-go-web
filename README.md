# no-afraid-go-web

#### 介绍

no-afraid-go-web

#### 软件架构

软件架构说明

#### 生成秘钥和公钥

放入文件项目根目录 rsa-key
openssl genrsa -out rsa_private_key.pem 2048
openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
