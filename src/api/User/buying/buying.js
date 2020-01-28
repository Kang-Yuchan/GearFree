import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        buying: async(_, args, req) => {
            isAuthenticated(req);
            const { id } = args;
            const { user } = req;
            try {
                await prisma.updateUser({
                    where :{
                        id: user.id
                    },
                    data: {
                        buyer: {
                            connect: {
                                id
                            }
                        }
                    }
                })
                return true
            } catch {
                return false
            }
        }
    }
}