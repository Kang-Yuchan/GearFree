import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, req) => {
      isAuthenticated(req);
      const { itemId } = args;
      const { user } = req;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            item: {
              id: itemId
            }
          }
        ]
      }
      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
            await prisma.deleteManyLikes(filterOptions);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            item: {
              connect: {
                id: itemId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};