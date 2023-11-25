import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answercomments: AnswerComment[]
  }
>

export class FetchAnswerAnswerCommentsUseCase {
  constructor(private answercommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerAnswerCommentsUseCaseRequest): Promise<FetchAnswerAnswerCommentsUseCaseResponse> {
    const answercomments =
      await this.answercommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answercomments,
    })
  }
}
