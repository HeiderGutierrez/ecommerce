import { db } from '@/database';
import { User } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwtToken } from '@/utils';

type Data = { message: string; } | {token: string, user:{name: string, role: string}}

export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res);
    
        default:
            return res.status(400).json({message: 'Bad request'});
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '' } = req.body;
    await db.connect();
    const user = await User.findOne({email}).lean();
    await db.disconnect();
    if(!user){
        return res.status(400).json({message: 'El correo no es válido'});
    }
    if(!bcrypt.compareSync(password, user.password!)){
        return res.status(400).json({message: 'El password no es válido'});
    }
    const { name, role, _id } = user;
    const token = jwtToken.signToken(_id, email);
    return res.status(200).json({
        token,
        user: {
            name,
            role
        }
    })
}