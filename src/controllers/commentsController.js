import commentsRepository from "../repositories/commentsRepository.js";

export const insertComment = async (req, res) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userData;
    const { rows } = await commentsRepository.insertComment(
        comment,
        postId,
        userId,
    );
    if (!rows.length)
        return res.status(404).send({
            message: `Comment not inserted, cannot found post ${postId} of user ${userId}`,
        });
    return res.status(201).send(rows[0]);
};
