import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

const FormError = (message) => (
    <div>

        <Form error>

            <Message
                error
                header='Action Forbidden'
                content={message}
            />

        </Form>
    </div>
)

export default FormError