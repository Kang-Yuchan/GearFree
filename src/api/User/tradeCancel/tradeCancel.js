import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        tradeCancel: async(_, args, req) => {
            isAuthenticated(req);
            const { id } = args;
            const { user } = req;
            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        buyer: {
                            disconnect: {
                                id
                            }
                        }
                    }
                })
                return true;
            } catch {
                return false;
            }
        }
    }
}